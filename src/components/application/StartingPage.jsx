import React from 'react'
import { SubHeadline } from '../generic/SubHeadline'
import { InfoText } from '../generic/InfoText'
import { Button } from '../generic/Button'
import { useNavigate } from 'react-router-dom'
import imgSrc from '../../images/Starting_page.jpg'
import recipeBig from '../../images/recipe_Big.png'
import recipeSmall from '../../images/recipe_small.png'
import { auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export const StartingPage = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  return (
        <div className="starting-page-container">
          <div>
            <div className='home-img-container'>
              <div>
                <img src={imgSrc}></img>
              </div>
            </div>
            <SubHeadline>Store all your favourite recipes in one place</SubHeadline>
            <InfoText>
              {` Create, edit, and
              delete recipes with ease, and discover
              what's hot in the food world with our
              culinary creations.`}
              <span className='buttons-container'>
                <Button type='button' variant='primary' onClick={() => navigate('/feed')}>Discover Recipes</Button>
              </span>
              { !user && (
                <span>Get started and create an <a href='/signup'>account</a> now!</span>
              )}
            </InfoText>
            <div className='screenshots-container'>
              <div className='first-img'><img src={recipeBig} alt="recipe screenshot" /></div>
              <div className='second-img'><img src={recipeSmall} alt="recipe screenshot" /></div>
            </div>
            <InfoText>
              <span><a href='/create-recipe'>Create</a> your own recipe!</span>
            </InfoText>
            </div>
        </div>
  )
}
