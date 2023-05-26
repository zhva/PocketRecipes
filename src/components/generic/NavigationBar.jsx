import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import feedIcon from '../../icons/feed.svg'
import myRecipesIcon from '../../icons/my-recipes.svg'
import createNewRecipeIcon from '../../icons/create-new-recipe.svg'
import startingPageIconBlack from '../../icons/starting-page.svg'

const toggleActive = (id) => {
  const buttons = document.querySelectorAll('.nav-bar-container button')
  buttons.forEach((button) => {
    if (button.id === id) {
      button.classList.add('active')
    } else {
      button.classList.remove('active')
    }
  })
}

export const NavigationBar = ({startingPageRoute, myRecipesRoute, feedRoute, newRecipeRoute}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const activeButtonId = (() => {
    switch (location.pathname) {
      case startingPageRoute:
        return 'startingPage'
      case myRecipesRoute:
        return 'myRecipesPage'
      case feedRoute:
        return 'homeFeed'
      case newRecipeRoute:
        return 'newRecipe'
      default:
        return ''
    }
  })()


  useEffect(() => {
    toggleActive(activeButtonId)
  }, [activeButtonId])

  return (
    <div className='nav-bar-container'>
      <button
        type='button'
        id='startingPage'
        className={activeButtonId === 'startingPage' ? 'active' : ''}
        onClick={() => {
          navigate(startingPageRoute)
          toggleActive('startingPage')
          }}>
        <img src={startingPageIconBlack} alt='starting page icon'></img>
      </button>
      <button
        type='button'
        id='myRecipesPage'
        className={activeButtonId === 'myRecipesPage' ? 'active' : ''}
        onClick={() => {
          navigate(myRecipesRoute)
          toggleActive('myRecipesPage')
          }}>
        <img src={myRecipesIcon} alt='my recipes icon'></img>
      </button>
      <button
        type='button'
        id='homeFeed'
        className={activeButtonId === 'homeFeed' ? 'active' : ''}
        onClick={() => {
          navigate(feedRoute)
          toggleActive('homeFeed')
          }}>
        <img src={feedIcon} alt='homefeed icon'></img>
      </button>
      <button
        type='button'
        id='newRecipe'
        className={activeButtonId === 'newRecipe' ? 'active' : ''}
        onClick={() => {
          navigate(newRecipeRoute)
          toggleActive('newRecipe')
          }}>
        <img src={createNewRecipeIcon} alt='create new recipe icon'></img>
      </button>
    </div>
  )
}
