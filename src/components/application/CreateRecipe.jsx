import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { ImageUpload } from '../generic/ImageUpload'
import { Card } from '../generic/Card'
import { VisibilitySwitch } from '../generic/VisibilitySwitch'
import { Button } from '../generic/Button'
import { AddInput } from '../generic/AddInput'
import { RecipeDescription } from '../generic/RecipeDescription'
import 'firebase/firestore'
import { ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { database, storage, auth } from '../../firebase'
import { ref, push, update, remove } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { RecipeHeadlines } from '../generic/RecipeHeadlines'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { useObjectVal } from 'react-firebase-hooks/database'

import { object, string, number, array, bool } from 'yup'

const ingredientSchema = object({
  id: string()
    .required(),
  name: string()
    .max(400, 'Ingredient must be 400 characters or less.')
    .required('Ingredient must not be empty.')
});

const preparationSchema = object({
  id: string()
    .required(),
  name: string()
    .max(400, 'Preparation step must be 400 characters or less.')
    .required('Preparation step must not be empty.')
});

const validationSchema = object().shape({
  name: string()
    .max(50, 'Too long.')
    .required('Name is required.'),
  description: string()
    .max(1000, 'Too long.')
    .required('Description is required.'),
  servings: number()
    .min(1, 'The min number of servings is 1.')
    .max(100, 'The max number of servings is 100.')
    .required('Servings cann not be empty.'),
  ingredients: array()
    .of(ingredientSchema)
    .min(1, 'At least 1 ingredient is required.')
    .max(50,'Max number of ingredients is 50.' ),
  preparations: array()
    .of(preparationSchema)
    .min(1, 'At least 1 preparation step is required.')
    .max(50, 'Max number of preparation steps is 50.'),
  visibility: bool()
})

const useRecipe = () => {
  const [imageSrc, setImageSrc] = useState(null)
  const navigate = useNavigate()

  const params = useParams()
  const [user] = useAuthState(auth)
  const recipeRef = ref(database, `users/${user?.uid}/recipes/${params.recipeId}`)
  const [recipe, loading] = useObjectVal(recipeRef)
  const userNameRef = ref(database, `users/${user?.uid}/name`)
  const [userName]= useObjectVal(userNameRef)

  const initialValues = {
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
      formik.setValues({...recipe.values, imageSrc: recipe.imageLink})
      // Set the image source in state here
      setImageSrc({ blob: null, base64: recipe.imageLink, file: 'existing-file' })
    } else {
      formik.setValues(initialValues)
    }
  }, [recipe])



  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const recipeData = {values}
      try {
        if(Object.keys(params).length === 0 && params.constructor === Object){
          if(imageSrc && imageSrc.blob){
            pushRecipe(recipeData, imageSrc.blob)
            navigate('/my-recipes')
          }
        } else {
          if(imageSrc && imageSrc.blob){
            updateRecipe(recipeData, imageSrc.blob)
          } else {
            updateRecipe(recipeData, null)
          }
          navigate('/my-recipes')
        }
      } catch (error) {
        alert(`An error occurred while saving/updating the recipe: ${error}`)
      }
    }
  })
  const { errors } = formik

  const handleAdd = (name) => {
    const values = formik.values[name]
    formik.setFieldValue(name, [...values, { id: uuidv4(), name: '' }])
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
      alert(`An error occurred while uploading the image to the DB: ${error}`)
    }
  }

  const toggleRecipeVisibilityInFeed = async (data, recipeId) => {
    const feedRef = ref(database, `feed/recipes/${recipeId}`)
    try {
      if (data.values.visibility) {
          await update(feedRef, data)
      } else {
          await remove(feedRef)
      }
    } catch (error) {
      alert(`An error occurred while toggling recipe visibility in feed: ${error}`)
    }
  }

  const updateRecipe = async (data, imageBlob) => {
    const recipesRef = user?.uid
      ? ref(database, `users/${user.uid}/recipes/${params.recipeId}`)
      : null
    let recipeData = {}
    try {
      if (!imageBlob) {
        recipeData = {
          ...data,
          timestamp: new Date().getTime(),
          imageLink: recipe?.imageLink
        }
      } else {
        const imageUrl = await uploadImage(imageBlob)
        const imageRef = await getDownloadURL(sRef(storage, imageUrl))
        recipeData = {
          ...data,
          imageLink: imageRef,
          timestamp: new Date().getTime()
        }
      }
      await update(recipesRef, recipeData)
      toggleRecipeVisibilityInFeed({...recipeData, author: userName, timestamp: new Date().getTime()}, params.recipeId)
    } catch (error) {
      alert(`An error occurred while updating the recipe: ${error}`)
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
        const newRecipeRef = await push(recipesRef, recipeData)
        toggleRecipeVisibilityInFeed({...recipeData, author: userName, timestamp: new Date().getTime()}, newRecipeRef.key)
      }
    } catch (error) {
      alert(`An error occurred while saving the recipe to your recipe list: ${error}`)
    }
    return recipesRef
  }

  return { handleAdd, handleDelete, handleChange: formik.handleChange, values: formik.values, handleSubmit: formik.handleSubmit, submitCount: formik.submitCount, setImageSrc, imageSrc, errors, recipe, loading}
}

export const CreateRecipe = () => {
  const { handleAdd, handleChange, handleDelete, values, handleSubmit, submitCount, setImageSrc, imageSrc, errors, recipe, loading } = useRecipe()
  const isSubmitted = submitCount > 0

  if (!loading || recipe){
    return (
      <div className='create-recipe-container'>
          <form onSubmit={ handleSubmit }>
              <ImageUpload
                setImageSrc={setImageSrc}
                imageSrc={imageSrc && imageSrc.base64 || values.imageSrc && values.imageSrc}
                valuesImageSrc={values.imageSrc && values.imageSrc}
                submitCount={submitCount}/>
              <Card>
                  <div className='recipe-card-container'>
                  <h1>Recipe name</h1>
                    <RecipeHeadlines
                      recipeName={values.name}
                      servings={values.servings}
                      handleChange={handleChange}
                      mode={'create'}
                      nameErrors = {isSubmitted && errors && errors.name}
                      servingsErrors = {isSubmitted && errors && errors.servings}/>
                    <RecipeDescription
                      description = {values && values.description}
                      descriptionErrors = {isSubmitted && errors && errors.description}
                      handleChange = {handleChange} />
                    <div className='ingredients-list-container'>
                        <h2>Ingredients</h2>
                        <AddInput
                          items={values && values.ingredients}
                          name='ingredients'
                          handleAdd={handleAdd}
                          handleChange={handleChange}
                          handleDelete={handleDelete}
                          errors={isSubmitted && errors && errors.ingredients}>
                        </AddInput>
                    </div>
                    <div className='preparations-list-container'>
                        <h2>Preparation steps</h2>
                        <AddInput
                          items={values && values.preparations}
                          name='preparations'
                          handleAdd={handleAdd}
                          handleChange={handleChange}
                          handleDelete={handleDelete}
                          errors={isSubmitted && errors && errors.preparations}
                          classP={'preparattions'}>
                        </AddInput>
                    </div>
                    <VisibilitySwitch
                      handleVisibilityChange={handleChange}
                      checked={values.visibility}
                      name="visibility"/>
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
