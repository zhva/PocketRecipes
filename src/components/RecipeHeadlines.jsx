import React from 'react'

export const RecipeHeadlines = ({ recipeName, servings, handleChange, mode }) => {
  return (
        <div className='recipe-headline'>
            {mode === 'create'
              ? (
                <label htmlFor='recipeName' >
                  <input
                    value={recipeName || ''}
                    type='text'
                    name='name'
                    id='recipeName'
                    onChange={handleChange}/>
                </label>
                )
              : <h1>{recipeName}</h1>}
            <p>Servings:
              {mode === 'create'
                ? (
                  <label htmlFor='recipeServings'>
                    <input
                      value={servings || ''}
                      type='number'
                      min = '1'
                      max={100}
                      name='servings'
                      id='recipeServings'
                      onChange={handleChange}/>
                </label>
                  )
                : <span>{servings}</span>} portion(s)</p>
        </div>
  )
}
