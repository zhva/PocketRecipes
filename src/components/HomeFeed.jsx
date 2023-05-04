import React from 'react'
import '../scss/HomeFeed.scss'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../firebase'
import { ref } from 'firebase/database'
import { RecipeCard } from './RecipeCard'

export const HomeFeed = () => {
  const [user] = useAuthState(auth)
  // Get a reference to the document
  const recipeRef = ref(database, `users/${user?.uid}/recipes`)
  const [recipes, loading, error] = useObjectVal(recipeRef)
  console.log(error)

  return (
    <div className='home-container'>
      <div className='home-heading-container'>
        <h1>PocketRecipes</h1>
        <span>Homefeed</span>
      </div>
      <div className='recipes-container'>
      <h2>Current recipes</h2>
      <div className='recipes-list-container' >
        {loading && <p>Loading recipes...</p>}
        {!loading && recipes && Object.entries(recipes ?? {}).slice(0, 1).map(([key, recipe]) => {
          return (
            <div className='first-recipe' key={key}>
              <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink} />
              <h3>{JSON.stringify(recipe.name)}</h3>
              <span>userX</span>
              <p>{JSON.stringify(recipe.description)}</p>
            </div>
          )
        })}
        {loading && <p>Loading recipes...</p>}
        {!loading && recipes && Object.entries(recipes ?? {}).slice(1).map(([key, recipe]) => {
          return (
            <div key={key}>
              <RecipeCard
                imageSrc={recipe.imageLink && recipe.imageLink}
                title={recipe.name}
                author=''
                description={recipe.description}
                // onClick = {handleClick(recipe.id)}
              />
            </div>
          )
        })}
        </div>
      </div>
    </div>

  )
}
