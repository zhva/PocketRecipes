import React from 'react'
import { SubHeadline } from '../generic/SubHeadline'
import { InfoText } from '../generic/InfoText'
import { Button } from '../generic/Button'
import { useNavigate } from 'react-router-dom'
import imgSrc from '../../images/home-img.jpg'

export const StartingPage = () => {
  const navigate = useNavigate()
  return (
        <div className="starting-page-container">
          <div>
            <div className='home-img-container'>
              <div>
                <img src={imgSrc}></img>
              </div>
            </div>
            <SubHeadline>Store all your favourite recipes in one place.</SubHeadline>
            <InfoText>
            Say hello to PocketRecipes, your new tool
            for all things cooking.
            <br></br>
            {`Create, edit, and
            delete recipes with ease, while also checking
            out what's hot in the food world with our
            recipe feed.`}
            <br></br>
            <br></br>
            {`Don't forget to sign up for an
            account to keep track of your personal recipes.
            Whether you're a newbie in the kitchen or a seasoned
            pro, PocketRecipes has got your back. And guess
            what? It's all made to be used on your smartphone,
            so you can whip up a storm from wherever you are.`}
            <br></br>
            <br></br>
            So get started and create an account now!
            </InfoText>
            <div className='buttons-container'>
              <Button type='button' variant='primary' onClick={() => navigate('/feed')}>Get Started</Button>
            </div>
            </div>
        </div>
  )
}
