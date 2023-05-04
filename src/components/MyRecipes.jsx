import React from 'react'
import '../scss/HomeFeed.scss'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../firebase'
import { ref } from 'firebase/database'
import { RecipeCard } from './RecipeCard'
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
            console.log({key})
          return (
            <div key={key}>
              <RecipeCard
                imageSrc={recipe.imageLink && recipe.imageLink}
                title={recipe.name}
                author=''
                description={recipe.description}
                onClick = {() => navigate(`/my-recipes/${key}`)} //  diese id wird später definiert
              />
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}
