import React from 'react'

export const RecipeInput = ({ value, uuid, handleDelete, name, handleChange }) => {
  return (
    <div className="recipe-input-container" >
      <label htmlFor={uuid}>
        <textarea
          onChange={handleChange}
          type='text' name={name}
          id={uuid}
          defaultValue={value}>
        </textarea>
        <button type='button' onClick={handleDelete} className='delete-button'>X</button>
      </label>
    </div>
  )
}
