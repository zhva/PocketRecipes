import React from 'react'

export const RecipeDescription = ({ description, descriptionErrors, handleChange, mode='edit' }) => {
  return (
    <div className={`recipe-description ${mode === 'display' ? 'display-description': ''}`}>
        <h2>Description</h2>
        <label htmlFor="descriptionId"></label>
        {mode === 'display' && (
          <p>description</p>
        )}
        {mode === 'edit' && (
          <textarea
              name='description'
              id='descriptionId'
              onChange={handleChange}
              defaultValue={description}
              maxLength={1001}>
          </textarea>
        )}
        { descriptionErrors && <div className='formik-errors'>{ descriptionErrors }</div> }
    </div>
  )
}
