import React from 'react'
import { WelcomeHeadline } from './WelcomeHeadline'
import { SubHeadline } from './SubHeadline'
import { InfoText } from './InfoText'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'
import { SignOutButton } from './SignoutButton'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

export const StartingPage = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  return (
        <div className="starting-page-container">
            <WelcomeHeadline />
            <SubHeadline>Store all your favourite recipes in one place.</SubHeadline>
            <InfoText>
                Worem ipsum dolor sit amet, consectetur adipiscing elit.
                Nunc vulputate libero et velit interdum, ac aliquet odio
                mattis interdum. Worem ipsum dolor sit amet, consectetur adipiscing elit.
                <br></br>
                <br></br>
                Nunc vulputate libero et velit interdum, ac aliquet odio mattis interdum.
                Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
                libero et velit interdum, ac aliquet odio mattis interdum. Worem ipsum
                dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
                velit interdum, ac aliquet odio mattis interdum.
            </InfoText>
            <div className='buttons-container'>
              <Button type='button'>Get Started</Button>
              { user
                ? <SignOutButton></SignOutButton>
                : <Button type='button' onClick={() => navigate('/signup')}>Create account</Button>
              }
            </div>
        </div>
  )
}
