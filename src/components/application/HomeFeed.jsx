import React, { useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { database } from '../../firebase'
import { ref } from 'firebase/database'
import { Button } from '../generic/Button'
// import { RecipeCard } from '../generic/RecipeCard'
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

  return (
    <div className='home-container'>
      <div className='recipes-container'>
      <h1>Homefeed</h1>
        <p>
          Discover Culinary Creations: A community feed of shared recipes at your fingertips!
          <br></br>
          Check them out now!
        </p>
      <div className='recipe-feed'>
        {loading && <p>Loading recipes...</p>}
        {!loading && recipes && Object.entries(recipes ?? {}).slice(0, 1).map(([key, recipe]) => {
          return (
            <div key = {key} onClick = {() => navigate(`/feed/${key}`)} className='main-recipe'>
                <h2>{recipe.values.name}</h2>
                <div className='main-recipe-img'>
                  <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink}></img>
                </div>
                <p>{recipe.values.description}</p>
            </div>)})}
            <div className='other-recipes'>
            {loading && <p>Loading recipes...</p>}
            {!seeMore && !loading && recipes && Object.entries(recipes ?? {}).slice(1, 5).map(([key, recipe]) => {
              return (
                  <div key={key} onClick = {() => navigate(`/feed/${key}`)} className='small-recipe'>
                      <div className='img-container'>
                        <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink}></img>
                      </div>
                      <h2>{recipe.values.name}</h2>
                  </div>)})}
            {seeMore && !loading && recipes && Object.entries(recipes ?? {}).slice(1).map(([key, recipe]) => {
              return (
                  <div key={key} onClick = {() => navigate(`/feed/${key}`)} className='small-recipe'>
                      <div className='img-container'>
                        <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink}></img>
                      </div>
                      <h2>{recipe.values.name}</h2>
                  </div>)})}
            </div>
      </div>
      <div className='see-more-container'>
        {seeMore ? <Button onClick={toggleSeeMore}>See less..</Button> : <Button onClick={toggleSeeMore}>See more..</Button>}
      </div>
      <div className='recipes-list-container' >
        {/* {loading && <p>Loading recipes...</p>}
        {!loading && recipes && Object.entries(recipes ?? {}).slice(0, 1).map(([key, recipe]) => {
          return (
            <div
              className='first-recipe'
              key={key}
              onClick = {() => navigate(`/feed/${key}`)}>
              <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink} />
              <h3>{recipe.values.name}</h3>
              <span>by {recipe.author}</span>
              <p>{recipe.values.description}</p>
            </div>
          )
        })} */}
        {/* {loading && <p>Loading recipes...</p>}
        {!loading && recipes && Object.entries(recipes ?? {}).slice(1).map(([key, recipe]) => {
          return (
            <div key={key}>
              <RecipeCard
                imageSrc={recipe.imageLink && recipe.imageLink}
                title={recipe.values.name}
                author={recipe.author}
                description={recipe.values.description}
                onClick = {() => navigate(`/feed/${key}`)}
              />
            </div>
          )
        })} */}
        </div>
      </div>
    </div>

  )
}
