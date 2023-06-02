import React from 'react'
import deleteIcon from '../../icons/deleteIcon.svg'

export const RecipeInput = ({ value, uuid, handleDelete, name, handleChange, inputError, index }) => {
  return (
    <div className='input-button-pair'>
      <div className='input-index'><span>{index + 1}. </span></div>
      <div className="recipe-input-container" >
        <label htmlFor={uuid}>
          <textarea
            onChange={handleChange}
            type='text' name={name}
            id={uuid}
            defaultValue={value}
            maxLength={401}>
          </textarea>
        </label>
        {inputError && <div className='formik-errors'>{inputError}</div>}
      </div>
      <button type='button' onClick={handleDelete} className='delete-button'>
      <img src={deleteIcon} alt='Delete'></img>
      </button>
    </div>
  )
}
