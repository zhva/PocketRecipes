import React from 'react'

export const RecipeInput = ({ value, uuid, handleDelete, name, handleChange }) => {
  return (
    <div className="recipe-input-container" >
      <label htmlFor={uuid}>
        <input
          onChange={handleChange}
          type='text' name={name}
          id={uuid}
          value={value}>
        </input>
        <button type='button' onClick={handleDelete} className='delete-button'>X</button>
      </label>
    </div>
  )
}
