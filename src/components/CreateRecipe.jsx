import React, { useState } from 'react'
import { useFormik } from 'formik'
import { ImageUpload } from './ImageUpload'
import { Card } from './Card'
import { VisibilitySwitch } from './VisibilitySwitch'
import { Button } from './Button'
import { AddInput } from './AddInput'
import 'firebase/firestore'
import { ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { database, storage, auth } from '../firebase'
import { ref, push } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { RecipeHeadlines } from './RecipeHeadlines'
import { useAuthState } from 'react-firebase-hooks/auth'

import { object, string, number, array, bool } from 'yup'

const validationSchema = object().shape({
  name: string().max(50, 'Too long!').required('Name is required!'),
  description: string().max(500, 'Too long!').required('Description is required!'),
  servings: number(),
  ingredients: array().required('Ingredients are required!'),
  preparations: array().required('Required!'),
  visibility: bool()
})

const useRecipe = () => {
  const [imageSrc, setImageSrc] = useState(null)
  const [user /* , userLoading */] = useAuthState(auth)

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      servings: null,
      ingredients: [],
      preparations: [],
      visibility: false
    },
    validationSchema,
    onSubmit: async (values) => {
      const recipeData = {
        name: values.name,
        description: values.description,
        servings: values.servings,
        ingredients: values.ingredients,
        preparations: values.preparations,
        visibility: values.visibility
      }
      try {
        pushRecipe(recipeData, imageSrc.blob)
      } catch (error) {
        console.log(error)
      }
    }
  })
  const { errors } = formik

  const handleAdd = (name) => {
    const values = formik.values[name]
    const lastValue = values[values.length - 1]

    if (!lastValue || lastValue.name.trim() !== "") {
      formik.setFieldValue(name, [...values, { id: uuidv4(), name: '' }])
    }
  }


  const handleDelete = (id, name) => {
    const newValues = formik.values[name].filter((value) => value.id !== id)
    formik.setFieldValue(name, newValues)
  }

  const uploadImage = async () => {
    if (!imageSrc) return null
    const storageRef = sRef(storage, `users/${user?.uid}/recipes/${imageSrc.file}`)
    try {
      await uploadBytes(storageRef, imageSrc.blob)
      return storageRef.fullPath
    } catch (error) {
      console.log(error)
    }
  }

  const pushRecipe = async (data) => {
    const recipesRef = user?.uid ? ref(database, `users/${user.uid}/recipes`) : null
    try {
      const imageUrl = await uploadImage(imageSrc)
      const imageRef = await getDownloadURL(sRef(storage, imageUrl))
      const recipeData = {
        ...data,
        imageLink: imageRef,
        timestamp: new Date().getTime()
      }
      // await update(recipesRef, recipeData)
      await push(recipesRef, recipeData)
    } catch (error) {
      console.log(error)
    }

    return recipesRef
  }
  return { handleAdd, handleDelete, handleChange: formik.handleChange, values: formik.values, handleSubmit: formik.handleSubmit, setImageSrc, imageSrc, errors }
}

export const CreateRecipe = () => {
  const { handleAdd, handleChange, handleDelete, values, handleSubmit, setImageSrc, imageSrc, errors } = useRecipe()

  return (
    <div className='create-recipe-container'>
        <form onSubmit={ handleSubmit }>
            <ImageUpload backLink='/path/to/backlink' setImageSrc={setImageSrc} imageSrc={imageSrc && imageSrc.base64}/>
            <Card>
                <div className='recipe-card-container'>
                  <RecipeHeadlines
                    recipeName={values.name}
                    servings={values.servings}
                    handleChange={handleChange}
                    mode={'create'}/>
                  { errors && <div className='formik-errors'>{ errors.name }</div> }
                  { errors && <div className='formik-errors'>{ errors.servings }</div> }
                  <div className='recipe-description'>
                    <label htmlFor="descriptionId"></label>
                    <textarea
                          name='description'
                          id='descriptionId'
                          onChange={handleChange}/>
                    { errors && <div className='formik-errors'>{ errors.description }</div> }
                  </div>
                  <div className='ingredients-list-container'>
                      <AddInput
                        items={values && values.ingredients}
                        name='ingredients'
                        handleAdd={handleAdd}
                        handleChange={handleChange}
                        handleDelete={handleDelete}>
                      </AddInput>
                      { errors && <div className='formik-errors'>{ errors.ingredients }</div> }
                  </div>
                  <div className='preparations-list-container'>
                      <AddInput
                        items={values && values.preparations}
                        name='preparations'
                        handleAdd={handleAdd}
                        handleChange={handleChange}
                        handleDelete={handleDelete}>
                      </AddInput>
                      { errors && <div className='formik-errors'>{ errors.preparations }</div> }
                  </div>
                  <VisibilitySwitch/>
                  <div className='btn-container'>
                      <Button type='submit'>Save</Button>
                  </div>
                </div>
            </Card>
        </form>
    </div>
  )
}
