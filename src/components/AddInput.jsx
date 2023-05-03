import React from 'react'
import { RecipeInput } from './RecipeInput'

export const AddInput = ({ items, handleAdd, handleDelete, handleChange, name }) => {
  return (
    <div>
      <div>
        {items && items.map((item, index) => {
          return <RecipeInput
            key={item.id}
            name={`${name}.${index}.name`}
            handleChange={handleChange}
            handleDelete={() => handleDelete(item.id, name)}
            value={item.name}>
            </RecipeInput>
        })}
        </div>
      <button
        className='add-button'
        type='button'
        onClick={() => handleAdd(name)}>
        +
      </button>
    </div>
  )
}
