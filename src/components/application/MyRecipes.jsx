import React from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../../firebase'
import { ref } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { Button } from '../generic/Button'
import plusIcon from '../../icons/plus-icon-white.svg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

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
          {`Welcome to your recipe section, your personal
          culinary hub.`}
          <br></br>
          <br></br>
          {`Here you'll find all your crafted
          recipes, from family favorites to experimental
          dishes, ready for easy access. Revisit, share,
          or refine your creations anytime you wish.`}
        </p>

        <div className='call-to-action-myrecipes'>
          <Button type='button' variant='primary' onClick={() => navigate('/create-recipe')}>
            <img src={plusIcon}></img>
            <p>Create recipe</p>
          </Button>
        </div>
        <div className='recipes-container'>
          <div className='recipe-list-container'>
            <div className='column'>
              {!loading && recipes && Object.entries(recipes ?? {})
                .map(([key, recipe]) => (
                  <div key={key} onClick = {() => navigate(`/my-recipes/${key}`)} className='recipe'>
                    <div className='recipe-img-container'>
                      <LazyLoadImage
                        effect="blur"
                        src={recipe.imageLink && recipe.imageLink}
                        alt={recipe.imageLink}
                      />
                    </div>
                    <div className='recipe-text'>
                      <h2>{recipe.values.name}</h2>
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
