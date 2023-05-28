import React from 'react'
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
    const path = window.location.pathname
    const pathParts = path.split('/')
    let recipeRef = null

    if(pathParts[1] === 'my-recipes') {
        recipeRef = ref(database, `users/${user?.uid}/recipes/${params.recipeId}`)
    } else if(pathParts[1] === 'feed') {
        recipeRef = ref(database, `feed/recipes/${params.recipeId}`)
    }

    const [recipe, loading] = useObjectVal(recipeRef)

    if (recipe && !loading) {
        const { imageLink, values } = recipe
        const { description, ingredients, name, preparations, servings } = values

        return (
            <div className='recipe-container'>
                <RecipeImage imageLink={imageLink} />
                <Card>
                    <RecipeHeadlines servings={servings} recipeName={name} />
                    <div className='recipe-button-container'>
                        <RecipeButtons recipeId={params.recipeId} path={pathParts[1]}/>
                    </div>
                    <div className='description-container'>
                        <p>{description}</p>
                    </div>
                    <IngredientPreparationLists
                        ingredients={ingredients}
                        preparationSteps={preparations}
                    />
                </Card>
            </div>
        )
    }

    return null;
};
