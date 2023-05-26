import React from 'react'
import { Button } from '../generic/Button'
import { RecipeImage } from '../generic/RecipeImage'
import { RecipeHeadlines } from '../generic/RecipeHeadlines'
import { IngredientPreparationLists } from '../generic/IngredientPreparationLists'
import { Card } from '../generic/Card'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../../firebase'
import { ref } from 'firebase/database'
import { useParams } from 'react-router-dom'
import { RecipeButtons } from '../generic/RecipeButtons'

export const Recipe = () => {
    const params = useParams()
    const [user] = useAuthState(auth)
    const recipeRef = ref(database, `users/${user?.uid}/recipes/${params.recipeId}`)
    const [recipe, loading] = useObjectVal(recipeRef)

    console.log(recipe)
    if (recipe && !loading) {
        const { imageLink, description, ingredients, name, preparations, servings } = recipe;

        return (
            <div className='recipe-container'>
                <RecipeImage imageLink={imageLink} />
                <Card>
                    <RecipeHeadlines servings={servings} recipeName={name} />
                    <div className='recipe-button-container'>
                        <RecipeButtons recipeId={params.recipeId} />
                    </div>
                    <div className='description-container'>
                        <p>{description}</p>
                    </div>
                    <IngredientPreparationLists
                        ingredients={ingredients}
                        preparationSteps={preparations}
                    />
                    <div className='btn-container'>
                        <Button type='submit'>Share Recipe</Button>
                    </div>
                </Card>
            </div>
        );
    }

    return null;
};
