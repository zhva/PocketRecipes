import React from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../../firebase'
import { ref } from 'firebase/database'
import { RecipeCard } from '../generic/RecipeCard'
import { useNavigate } from 'react-router-dom'

export const MyRecipes = () => {
  const [user] = useAuthState(auth)
  // Get a reference to the document
  const recipeRef = ref(database, `users/${user?.uid}/recipes`)
  const [recipes, loading] = useObjectVal(recipeRef)
  const navigate = useNavigate()

  return (
    <div className='home-container'>
      <div className='home-heading-container'>
        <h1>PocketRecipes</h1>
        <span>MyRecipes</span>
      </div>
      <div className='recipes-container'>
      <h2>Current recipes</h2>
      <div className='recipes-list-container' >
        {loading && <p>Loading recipes...</p>}
        {!loading && recipes && Object.entries(recipes ?? {}).map(([key, recipe]) => {
          return (
            <div key={key}>
              <RecipeCard
                imageSrc={recipe.imageLink && recipe.imageLink}
                title={recipe.values.name}
                author=''
                description={recipe.values.description}
                onClick = {() => navigate(`/my-recipes/${key}`)}
              />
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}
