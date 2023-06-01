import React, { useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { database } from '../../firebase'
import { ref } from 'firebase/database'
import { Button } from '../generic/Button'
import { useNavigate } from 'react-router-dom'

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
    return (
      <div className='home-container'>
        <div className='recipes-container'>
          <h1>Discover <br></br>Culinary Creations</h1>
            <p>
              A community feed of shared recipes at your fingertips!
              Check them out now!
            </p>
          <div className='recipe-feed'>
            {loading && <p>Loading recipes...</p>}
            {!loading && recipes && Object.entries(recipes ?? {}).slice(0, 1).map(([key, recipe]) => {
              return (
                <div key = {key} onClick = {() => navigate(`/feed/${key}`)} className='main-recipe'>
                    <div className='main-recipe-img'>
                      <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink}></img>
                    </div>
                    <h2>{recipe.values.name}</h2>
                    <p>{recipe.values.description}</p>
                </div>)})}
                <div className='other-recipes'>
                {loading && <p>Loading recipes...</p>}
                {!loading && recipes &&
                    Object.entries(recipes ?? {})
                        .slice(1, seeMore ? undefined : 5)
                        .map(([key, recipe]) => (
                            <div key={key} onClick = {() => navigate(`/feed/${key}`)} className='small-recipe'>
                                <div className='img-container'>
                                    <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink}></img>
                                </div>
                                <h2>{recipe.values.name}</h2>
                            </div>
                        ))
                }
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
