import React from 'react'
import './StartingPage.scss'
import { WelcomeHeadline } from './WelcomeHeadline'
import { SubHeadline } from './SubHeadline'
import { InfoText } from './InfoText'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

export const StartingPage = () => {
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
            <Button type='button'>Get Started</Button>
            <Button type='button' onClick={() => navigate('/signup')}>Create account</Button>
        </div>
  )
}
