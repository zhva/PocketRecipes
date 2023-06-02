import React, { useEffect, useRef } from 'react'

export const RecipeDescription = ({ description, descriptionErrors, handleChange, mode='edit' }) => {
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
    <div className={`recipe-description ${mode === 'display' ? 'display-description': ''}`}>
        <h2>Description</h2>
        <label htmlFor="descriptionId"></label>
        {mode === 'display' && (
          <p>{description}</p>
        )}
        {mode === 'edit' && (
          <textarea
            ref={textareaRef}
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
