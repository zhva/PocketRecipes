import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { ImageUpload } from './ImageUpload'
import { Card } from './Card'
import { VisibilitySwitch } from './VisibilitySwitch'
import { Button } from './Button'
import { AddInput } from './AddInput'
import 'firebase/firestore'
import { ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { database, storage, auth } from '../firebase'
import { ref, push, update } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { RecipeHeadlines } from './RecipeHeadlines'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { useObjectVal } from 'react-firebase-hooks/database'

import { object, string, number, array, bool } from 'yup'

const validationSchema = object().shape({
  name: string().max(50, 'Too long.').required('Name is required.'),
  description: string().max(500, 'Too long.').required('Description is required.'),
  servings: number().min(1).max(100).required('Servings cann not be empty.'),
  ingredients: array().min(1, 'At least one ingredient is required.'),
  preparations: array().min(1, 'At least one preparation step is required.'),
  visibility: bool()
})

const useRecipe = () => {
  const [imageSrc, setImageSrc] = useState(null)
  const navigate = useNavigate()

  const params = useParams()
  const [user] = useAuthState(auth)
  const recipeRef = ref(database, `users/${user?.uid}/recipes/${params.recipeId}`)
  const [recipe, loading] = useObjectVal(recipeRef)

  let recipeValues = {
    name: '',
    description: '',
    servings: null,
    ingredients: [],
    preparations: [],
    visibility: false,
    imageSrc: null
  }

  useEffect(() => {
    if (!loading && recipe && Object.keys(params).length !== 0 && params.constructor === Object) {
      recipeValues = {
        name: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        preparations: recipe.preparations,
        visibility: recipe.visibility,
        imageSrc: recipe.imageLink
      }
    }
    formik.setValues(recipeValues)
  }, [recipe])

  const formik = useFormik({
    initialValues: recipeValues,
    validationSchema,
    onSubmit: async (values) => {
      const recipeData = {
        name: values.name,
        description: values.description,
        servings: values.servings,
        ingredients: values.ingredients,
        preparations: values.preparations,
        visibility: values.visibility,
        imageSrc: values.imageSrc
      }
      try {
        if(Object.keys(params).length === 0 && params.constructor === Object){
          if(imageSrc)
          {
            pushRecipe(recipeData, imageSrc && imageSrc.blob)
            navigate('/my-recipes')
          }
        } else {
          updateRecipe(recipeData, imageSrc && imageSrc.blob)
          navigate('/my-recipes')
        }
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

  const updateRecipe = async (data) => {
    const recipesRef = user?.uid ? ref(database, `users/${user.uid}/recipes/${params.recipeId}`) : null
    let recipeData= {}
    try {
      if (!imageSrc) {
        recipeData = {
          ...data,
          timestamp: new Date().getTime()
        }
      } else {
        const imageUrl = await uploadImage(imageSrc)
        const imageRef = await getDownloadURL(sRef(storage, imageUrl))
        recipeData = {
          ...data,
          imageLink: imageRef,
          timestamp: new Date().getTime()
        }
      }
      await update(recipesRef, recipeData)
    } catch (error) {
      console.log(error)
    }
    return recipesRef
  }

  const pushRecipe = async (data) => {
    if (!imageSrc) return
    const recipesRef = user?.uid ? ref(database, `users/${user.uid}/recipes`) : null
    try {
      if(imageSrc) {
        const imageUrl = await uploadImage(imageSrc)
        const imageRef = await getDownloadURL(sRef(storage, imageUrl))
        const recipeData = {
          ...data,
          imageLink: imageRef,
          timestamp: new Date().getTime()
        }
        await push(recipesRef, recipeData)
      }
    } catch (error) {
      console.log(error)
    }
    return recipesRef
  }
  return { handleAdd, handleDelete, handleChange: formik.handleChange, values: formik.values, handleSubmit: formik.handleSubmit, setImageSrc, imageSrc, errors, recipe, loading}
}

export const CreateRecipe = () => {
  const { handleAdd, handleChange, handleDelete, values, handleSubmit, setImageSrc, imageSrc, errors, recipe, loading } = useRecipe()

  if (!loading || recipe){
    return (
      <div className='create-recipe-container'>
          <form onSubmit={ handleSubmit }>
              <ImageUpload setImageSrc={setImageSrc} imageSrc={imageSrc && imageSrc.base64 || values.imageSrc && values.imageSrc} />
              <Card>
                  <div className='recipe-card-container'>
                  {!imageSrc && !values.imageSrc && <div className='formik-errors'>Image is required</div>}
                  { errors && <div className='formik-errors'>{ errors.imageSrc }</div> }
                  <h1>Recipe name</h1>
                    <RecipeHeadlines
                      recipeName={values.name}
                      servings={values.servings}
                      handleChange={handleChange}
                      mode={'create'}/>
                    { errors && <div className='formik-errors'>{ errors.name }</div> }
                    { errors && <div className='formik-errors'>{ errors.servings }</div> }
                    <div className='recipe-description'>
                      <h1>Description</h1>
                      <label htmlFor="descriptionId"></label>
                      <textarea
                            name='description'
                            id='descriptionId'
                            onChange={handleChange}
                            defaultValue={recipe && recipe.description}>
                            {}
                      </textarea>
                      { errors && <div className='formik-errors'>{ errors.description }</div> }
                    </div>
                    <div className='ingredients-list-container'>
                        <h1>Ingredients</h1>
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
                        <h1>Preparations</h1>
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
}
