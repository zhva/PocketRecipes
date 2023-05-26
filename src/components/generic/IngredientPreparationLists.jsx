import React from 'react'

export const IngredientPreparationLists = ({ingredients, preparationSteps}) => {
  return (
        <div className='ingredients-preparation-list'>
            <h2>Ingredients</h2>
            <ol>
                {ingredients.map((ingredient, index) => (
                    <li key={ingredient.id}><span>{(index + 1)}.</span> {ingredient.name}</li>
                ))}
            </ol>
            <h2>Preparation</h2>
            <ol>
                {preparationSteps.map((prepStep, index) => (
                    <li key={prepStep.id}><span>{(index + 1)}.</span> {prepStep.name}</li>
                ))}
            </ol>
        </div>
  )
}
