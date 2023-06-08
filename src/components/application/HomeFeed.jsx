import React, { useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { database } from '../../firebase'
import { ref } from 'firebase/database'
import { Button } from '../generic/Button'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export const HomeFeed = () => {
  // Get a reference to the document
  const [seeMore, setSeeMore] = useState(false)
  const recipeRef = ref(database, `feed/recipes`)
  const [recipes, loading] = useObjectVal(recipeRef)
  const navigate = useNavigate()

  const toggleSeeMore = () => {
    setSeeMore(!seeMore);
    }

  if(!loading) {
    const recipesEntries = Object.entries(recipes)
    const sortedRecipesEntries = recipesEntries.sort(([,a], [,b]) => b.timestamp - a.timestamp)
    const limitedRecipes = seeMore ? sortedRecipesEntries : sortedRecipesEntries.slice(0, 5)

    return (
      <div className='home-container'>
        <div className='recipes-container'>
          <h1>Discover <br></br>Culinary Creations</h1>
          <p>
            A community feed of shared recipes at your fingertips!
            Check them out now!
          </p>
          <div className='recipe-feed'>
            {limitedRecipes.slice(0, 1).map(([key, recipe]) => (
              <div key={key} onClick={() => navigate(`/feed/${key}`)} className='main-recipe'>
                <div className='main-recipe-img'>
                  <LazyLoadImage
                    effect="blur"
                    src={recipe.imageLink}
                    alt={recipe.imageLink}
                  />
                </div>
                <h2>{recipe.values.name}</h2>
                <p>{recipe.values.description}</p>
              </div>
            ))}
            <div className='other-recipes'>
              {limitedRecipes.slice(1).map(([key, recipe]) => (
                <div key={key} onClick={() => navigate(`/feed/${key}`)} className='small-recipe'>
                  <div className='img-container'>
                    <LazyLoadImage
                      effect="blur"
                      src={recipe.imageLink}
                      alt={recipe.imageLink}
                    />
                  </div>
                  <h2>{recipe.values.name}</h2>
                </div>
              ))}
            </div>
          </div>
          <div className='see-more-container'>
            {seeMore ? <Button onClick={toggleSeeMore}>See less..</Button> : <Button onClick={toggleSeeMore}>See more..</Button>}
          </div>
        </div>
      </div>
    )

  } else {
    loading && <p className="loading">Loading recipes...</p>
  }
}
