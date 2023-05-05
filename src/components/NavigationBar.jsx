import React from 'react'
import feedIcon from '../icons/feed.svg'
import myRecipesIcon from '../icons/my-recipes.svg'
import createNewRecipeIcon from '../icons/create-new-recipe.svg'
import startingPageIconBlack from '../icons/starting-page.svg'

export const NavigationBar = (props) => {
  return (
    <div className='nav-bar-container'>
      <button type='button' onClick={props.redirectToStartingPage}>
        <img src={startingPageIconBlack} alt='starting page icon'></img>
      </button>
      <button type='button' onClick={props.redirectToMyRecipes}>
        <img src={myRecipesIcon} alt='my recipes icon'></img>
      </button>
      <button type='button' onClick={props.redirectToFeed}>
        <img src={feedIcon} alt='homefeed icon'></img>
      </button>
      <button type='button' onClick={props.redirectToNewRecipe}>
        <img src={createNewRecipeIcon} alt='create new recipe icon'></img>
      </button>
    </div>
  )
}
