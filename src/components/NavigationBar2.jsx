import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'
import { useSignOut } from 'react-firebase-hooks/auth'

const useCustomSignOut = (onSuccess) => {
    const [signOut] = useSignOut(auth)

    const handleSignOut = async () => {
      await signOut()
      onSuccess()
    }

    return handleSignOut
}

export const NavBar = ({startingPageRoute, myRecipesRoute, feedRoute, newRecipeRoute, user}) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const handleSignOut = useCustomSignOut(() => navigate('/login'))

    const toggleMenu = () => {
    setIsOpen(!isOpen);
    }

    const closeMenu = () => {
    setIsOpen(false);
    }

  return (
    <nav>
      <button 
        className={`hamburger ${isOpen ? "opened" : "closed"}`} 
        onClick={toggleMenu}
      >
        <span className="line line-1"></span>
        <span className="line line-2"></span>
        <span className="line line-3"></span>
      </button>
      <ul className={isOpen ? "transition" : ""}>
        <li><a onClick={() => {closeMenu(); navigate(startingPageRoute)}} href="">Home</a></li>
        <li><a onClick={() => {closeMenu(); navigate(myRecipesRoute)}} href="">My Recipes</a></li>
        <li><a onClick={() => {closeMenu(); navigate(feedRoute)}} href="">Feed</a></li>
        <li><a onClick={() => {closeMenu(); navigate(newRecipeRoute)}} href="">Create Recipe</a></li>
        {user ? 
            <li><a onClick={() => {closeMenu(); handleSignOut()}} href="">Logout</a></li>
            : 
            <li><a onClick={() => {closeMenu(); navigate('/login') }} href="">Login</a></li>
        }
      </ul>
    </nav>
  )
}
