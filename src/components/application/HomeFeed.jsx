import React from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { database } from '../../firebase'
import { ref } from 'firebase/database'
import { RecipeCard } from '../generic/RecipeCard'
import { useNavigate } from 'react-router-dom'

export const HomeFeed = () => {
  // Get a reference to the document
  const recipeRef = ref(database, `feed/recipes`)
  const [recipes, loading] = useObjectVal(recipeRef)
  const navigate = useNavigate()

  return (
    <div className='home-container'>
      <div className='recipes-container'>
        <h1>Homefeed</h1>
        <p>
          Discover Culinary Creations: A community feed of shared recipes at your fingertips!
          <br></br>
          <br></br>
          Check them out now!
        </p>
        
        <div className='recipes-list-container' >
          {loading && <p>Loading recipes...</p>}
          {!loading && recipes && Object.entries(recipes ?? {}).slice(0, 1).map(([key, recipe]) => {
            return (
              <div
                className='first-recipe'
                key={key}
                onClick = {() => navigate(`/feed/${key}`)}>
                <img src={recipe.imageLink && recipe.imageLink} alt={recipe.imageLink} />
                <h3>{recipe.values.name}</h3>
                <span>{recipe.author}</span>
                <p>{recipe.values.description}</p>
              </div>
            )
          })}
          {loading && <p>Loading recipes...</p>}
          {!loading && recipes && Object.entries(recipes ?? {}).slice(1).map(([key, recipe]) => {
            return (
              <div key={key}>
                <RecipeCard
                  imageSrc={recipe.imageLink && recipe.imageLink}
                  title={recipe.values.name}
                  author=''
                  description={recipe.values.description}
                  onClick = {() => navigate(`/feed/${key}`)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>

  )
}
