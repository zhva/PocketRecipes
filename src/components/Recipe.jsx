import React from 'react'
import RecipeBackground from '../images/pasta1.png'
import { Button } from './Button'
import { RecipeImage } from './RecipeImage'
import { RecipeHeadlines } from './RecipeHeadlines'
import { IngredientPreparationLists } from './IngredientPreparationLists'
import { Card } from './Card'
import { RecipeButtons } from './RecipeButtons'

export const Recipe = (props) => {
//   const ingredients = ['Pasta of your choice 250g', 'Two Tomatoes ', 'Chili flakes', 'Italian herbs', 'Parmigiano 25g']
//   const preparationSteps = ['Salt and bring water to a boil', 'Preheat pan and cut tomatoes and onions', 'Fry tomatoes and onion', 'Put pasta into boiling water', 'When the pasta is al dente drain them and and throw them into the pan with some chili flakes. Toss the pan a couple of times.']
  return (
        <div className='recipe-container'>
            <RecipeImage image={RecipeBackground}/>
            <Card>
                <RecipeHeadlines recipeName={'Pasta Arrabiata'}/>
                <RecipeButtons/>
                <IngredientPreparationLists />
                <div className='btn-container'>
                    <Button type = {'submit'}>Share Recipe</Button>
                </div>
            </Card>
        </div>
  )
}
