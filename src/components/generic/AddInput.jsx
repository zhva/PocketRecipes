import React from 'react'
import { RecipeInput } from './RecipeInput'

export const AddInput = ({ items, handleAdd, handleDelete, handleChange, name, errors }) => {
  return (
    <div>
      <div>
        {items && items.map((item, index) => {
          const itemError = errors && errors[index] && errors[index].name
          return (
            <RecipeInput
              key={item.id}
              name={`${name}.${index}.name`}
              handleChange={handleChange}
              handleDelete={() => handleDelete(item.id, name)}
              value={item.name}
              inputError={itemError}
              index={index}>
            </RecipeInput>
          )
        })}
        </div>
      <button
        className='add-button'
        type='button'
        onClick={() => handleAdd(name)}>
        +
      </button>
      {errors && typeof errors === 'string' && <div className='formik-errors'>{errors}</div>}
    </div>
  )
}
