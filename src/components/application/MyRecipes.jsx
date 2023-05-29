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
  const userNameRef = ref(database, `users/${user?.uid}/name`)
  const [recipes, loading] = useObjectVal(recipeRef)
  const [userName, nameLoading ]= useObjectVal(userNameRef)
  const navigate = useNavigate()

  if(!loading && !nameLoading) {
    return (
      <div className='home-container'>
        <h1>My Recipes</h1>
        <div className='recipes-container'>
        <div className='recipes-list-container' >
          {!loading && recipes && Object.entries(recipes ?? {}).map(([key, recipe]) => {
            return (
              <div key={key}>
                <RecipeCard
                  imageSrc={recipe.imageLink && recipe.imageLink}
                  title={recipe.values.name}
                  author={userName}
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
  } else {
    loading && <p className="loading">Loading recipes...</p>
  }
}
