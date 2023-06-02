import React, { useEffect, useRef } from 'react'
import deleteIcon from '../../icons/deleteIcon.svg'

export const RecipeInput = ({ value, uuid, handleDelete, name, handleChange, inputError, index, classP }) => {
  const textareaRef = useRef()

  useEffect(() => {
    const handleInput = () => {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
    const textareaElement = textareaRef.current
    textareaElement.addEventListener('input', handleInput)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      textareaElement.removeEventListener('input', handleInput)
    }
  }, [])

  return (
    <div className='input-button-pair'>
      <div className='input-index'><span>{index + 1}. </span></div>
      <div className="recipe-input-container" >
        <label htmlFor={uuid}>
          <textarea
            ref={textareaRef}
            onChange={handleChange}
            type='text' name={name}
            id={uuid}
            defaultValue={value}
            maxLength={401}
            className={classP}>
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
