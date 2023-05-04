import React from 'react'

export const IngredientPreparationLists = (props) => {
  // comment out const and use props once we have a list of recipes
  const ingredients = ['Pasta of your choice 250g', 'Two Tomatoes ', 'Chili flakes', 'Italian herbs', 'Parmigiano 25g']
  const preparationSteps = ['Salt and bring water to a boil', 'Preheat pan and cut tomatoes and onions', 'Fry tomatoes and onion', 'Put pasta into boiling water', 'When the pasta is al dente drain them and and throw them into the pan with some chili flakes. Toss the pan a couple of times.']

  return (
        <div className='ingredients-preparation-list'>
            <h2>Ingredients</h2>
            <ol>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ol>
            <h2>Preparation</h2>
            <ol>
                {preparationSteps.map((prepStep, index) => (
                    <li key={index}>{prepStep}</li>
                ))}
            </ol>
        </div>
  )
}
