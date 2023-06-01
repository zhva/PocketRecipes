import React from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../../firebase'
import { ref } from 'firebase/database'
// import { RecipeCard } from '../generic/RecipeCard'
import { useNavigate } from 'react-router-dom'
import { Button } from '../generic/Button'

export const MyRecipes = () => {
  const [user] = useAuthState(auth)
  const recipeRef = ref(database, `users/${user?.uid}/recipes`)
  const [recipes, loading] = useObjectVal(recipeRef)
  const navigate = useNavigate()

  if(!loading) {
    return (
      <div className='home-container'>
        <h1>My Recipes</h1>
        <p className='myrecipe-text'>
          {`Welcome to your "MyRecipes" section, your personal 
          culinary hub! Here you'll find all your crafted 
          recipes, from family favorites to experimental 
          dishes, ready for easy access. Revisit, share, 
          or refine your creations anytime you wish.`}
        </p>
        <Button>
          
          Create recipe
        </Button>
        <div className='recipes-container'>
          <div className='recipe-list-container'>
            <div className='column left-column'>
              {!loading && recipes && Object.entries(recipes ?? {})
                .filter((_, index) => index % 2 === 0)
                .map(([key, recipe]) => (
                  <div key={key} onClick = {() => navigate(`/my-recipes/${key}`)} className='recipe'>
                    <div className='recipe-img-container'>
                      <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink}></img>
                    </div>
                    <div className='recipe-text'>
                      <h2>{recipe.values.name}</h2>
                      <p>{recipe.values.description}</p>
                    </div>
                  </div>
              ))}
            </div>
            <div className='column right-column'>
              {!loading && recipes && Object.entries(recipes ?? {})
                .filter((_, index) => index % 2 === 1)
                .map(([key, recipe]) => (
                  <div key={key} onClick = {() => navigate(`/my-recipes/${key}`)} className='recipe'>
                    <div className='recipe-img-container'>
                      <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink}></img>
                    </div>
                    <div className='recipe-text'>
                      <h2>{recipe.values.name}</h2>
                      <p>{recipe.values.description}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    loading && <p className="loading">Loading recipes...</p>
  }
}
