import React from 'react'
import { auth } from '../../firebase'
import { useSignOut } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'

const useCustomSignOut = (onSuccess) => {
    const [signOut] = useSignOut(auth)

    const handleSignOut = async () => {
      await signOut()
      onSuccess()
    }

    return handleSignOut
  }

export const SignOutButton = () => {
    const navigate = useNavigate()
    const handleSignOut = useCustomSignOut(() => navigate('/login'))

  return (
    <Button onClick={handleSignOut} className='signout-button'>Sign out</Button>
  )
}
