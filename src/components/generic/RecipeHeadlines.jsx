import React from 'react'

export const RecipeHeadlines = ({ recipeName, servings, handleChange, mode, nameErrors, servingsErrors }) => {
  return (
        <div className='recipe-headline'>
            {mode === 'create'
              ? (
                <label htmlFor='recipeName' >
                  <input
                    aria-label="recipeName"
                    value={recipeName || ''}
                    type='text'
                    name='name'
                    id='recipeName'
                    onChange={handleChange}/>
                </label>
                )
              : <h1>{recipeName}</h1>}
            { nameErrors && <div className='formik-errors'>{ nameErrors }</div> }
            <p>Servings:
              {mode === 'create'
                ? (
                  <label htmlFor='recipeServings'>
                    <input
                      aria-label="recipeServings"
                      value={servings || ''}
                      type='number'
                      min = {0}
                      max={101}
                      name='servings'
                      id='recipeServings'
                      onChange={handleChange}/>
                </label>
                  )
                : <span>{servings}</span>} portion(s)</p>
                { servingsErrors && <div className='formik-errors'>{ servingsErrors }</div> }
        </div>
  )
}
