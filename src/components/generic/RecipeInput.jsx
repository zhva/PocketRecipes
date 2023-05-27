import React from 'react'

export const RecipeInput = ({ value, uuid, handleDelete, name, handleChange, inputError }) => {
  return (
    <div className="recipe-input-container" >
      <label htmlFor={uuid}>
        <textarea
          onChange={handleChange}
          type='text' name={name}
          id={uuid}
          defaultValue={value}
          maxLength={401}>
        </textarea>
        <button type='button' onClick={handleDelete} className='delete-button'>X</button>
      </label>
      {inputError && <div className='formik-errors'>{inputError}</div>}
    </div>
  )
}
