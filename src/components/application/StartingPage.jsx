import React from 'react'
// import { WelcomeHeadline } from '../generic/WelcomeHeadline'
import { SubHeadline } from '../generic/SubHeadline'
import { InfoText } from '../generic/InfoText'
import { Button } from '../generic/Button'
import { useNavigate } from 'react-router-dom'
import imgSrc from '../../images/home-img.jpg'
// import { SignOutButton } from '../generic/SignoutButton'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { auth } from '../../firebase'

export const StartingPage = () => {
  // const [user] = useAuthState(auth)
  const navigate = useNavigate()
  return (
        <div className="starting-page-container">
          <div>
            {/* <WelcomeHeadline /> */}
            <div className='home-img-container'>
              <div>
                <img src={imgSrc}></img>
                <a href="https://www.freepik.com/free-vector/male-chef-mixing-flour-eggs-dough-with-whisk-hands-happy-man-apron-preparing-homemade-sweet-dessert-table-home-kitchen-flat-vector-illustration-pastry-cooking-recipe-concept_22343895.htm#query=cooking&position=4&from_view=search&track=sph#position=4&query=cooking">Image by pch.vector</a>              </div>
            </div>
            <SubHeadline>Store all your favourite recipes in one place.</SubHeadline>
            <InfoText>
            Say hello to PocketRecipes, your new tool
            for all things cooking. 
            <br></br>
            Create, edit, and
            delete recipes with ease, while also checking
            out what&apos;s hot in the food world with our
            recipe feed.
            <br></br>
            <br></br>
            Don&apos;t forget to sign up for an
            account to keep track of your personal recipes.
            Whether you&apos;re a newbie in the kitchen or a seasoned
            pro, PocketRecipes has got your back. And guess
            what? It&apos;s all made to be used on your smartphone,
            so you can whip up a storm from wherever you are.
            <br></br>
            <br></br>
            So get started and create an account now!
            </InfoText>
            <div className='buttons-container'>
              <Button type='button' variant='primary' onClick={() => navigate('/feed')}>Get Started</Button>
              {/* { user
                ? <SignOutButton></SignOutButton>
                : <Button type='button' onClick={() => navigate('/signup')}>Create account</Button>
              } */}
            </div>
            </div>
        </div>
  )
}
