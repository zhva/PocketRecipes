import React from 'react'

export const RecipeDescription = ({ description, descriptionErrors, handleChange }) => {
  return (
    <div className='recipe-description'>
        <h1>Description</h1>
        <label htmlFor="descriptionId"></label>
        <textarea
            name='description'
            id='descriptionId'
            onChange={handleChange}
            defaultValue={description}>
            {}
        </textarea>
        { descriptionErrors && <div className='formik-errors'>{ descriptionErrors }</div> }
    </div>
  )
}
