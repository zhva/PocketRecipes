import React from 'react'
import RecipeBackground from '../images/pasta1.png'
import { Button } from './Button'
import { RecipeImage } from './RecipeImage'
import { RecipeHeadlines } from './RecipeHeadlines'
import { IngredientPreparationLists } from './IngredientPreparationLists'
import { Card } from './Card'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../firebase'
import { ref } from 'firebase/database'
import { useParams } from 'react-router-dom'
import { RecipeButtons } from './RecipeButtons'

export const Recipe = (props) => {
    const params = useParams()
    const [user] = useAuthState(auth)
    const recipeRef = ref(database, `users/${user?.uid}/recipes/${params.recipeId}`)
    const [recipe, loading] = useObjectVal(recipeRef)

    if (recipe || !loading)
    {
        return (
            <div className='recipe-container'>
                <RecipeImage
                    image={RecipeBackground}
                    imageLink={recipe.imageLink && recipe.imageLink}/>
                <Card>
                    <RecipeHeadlines recipeName={recipe.name}/>
                     <RecipeButtons/>
                    <div className='description-container'>
                        <p>{recipe.description}</p>
                    </div>
                    <IngredientPreparationLists
                        ingredients = {recipe.ingredients}
                        preparationSteps = {recipe.preparations}/>
                    <div className='btn-container'>
                        <Button type = {'submit'}>Share Recipe</Button>
                    </div>
                </Card>
            </div>
        )
    }
}
