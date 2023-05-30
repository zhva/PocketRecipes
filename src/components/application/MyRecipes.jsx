import React from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../../firebase'
import { ref } from 'firebase/database'
// import { RecipeCard } from '../generic/RecipeCard'
import { useNavigate } from 'react-router-dom'

export const MyRecipes = () => {
  const [user] = useAuthState(auth)
  // Get a reference to the document
  const recipeRef = ref(database, `users/${user?.uid}/recipes`)
  // const userNameRef = ref(database, `users/${user?.uid}/name`)
  const [recipes, loading] = useObjectVal(recipeRef)
  // const [userName, nameLoading ]= useObjectVal(userNameRef)
  const navigate = useNavigate()

  if(!loading) {
    return (
      <div className='home-container'>
        <h1>My Recipes</h1>
        <p className='myrecipe-text'>
          {`Welcome to your personal recipe library!`}
          <br></br>
          <br></br>
          {`This is your "MyRecipes" section - a culinary 
          sanctuary where your creativity comes to life. 
          Here, you'll find all the recipes you've meticulously 
          crafted.`}
          <br></br>
          <br></br>
          {`Every dish you've created, from family favorites to 
          experimental dishes, is stored right here for easy access.
          You can revisit them anytime you want to 
          recreate a meal, share your delicious creations with 
          others, or refine your recipes with new inspirations.`}
        </p>
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
