import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'
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
        <div className='navbar-container'>
            <div>
                <h1>Pocket<br></br>Recipes</h1>
            </div>
            <div>
                <button
                    className={`hamburger ${isOpen ? "opened" : "closed"}`}
                    onClick={toggleMenu}
                    >
                    <span className="line line-1"></span>
                    <span className="line line-2"></span>
                    <span className="line line-3"></span>
                </button>
            </div>
        </div>
      <ul className={isOpen ? "transition" : ""}>
        <li><button onClick={() => {closeMenu(); navigate(startingPageRoute)}}>Home</button></li>
        <li><button onClick={() => {closeMenu(); navigate(myRecipesRoute)}}>My Recipes</button></li>
        <li><button onClick={() => {closeMenu(); navigate(feedRoute)}}>Feed</button></li>
        <li><button onClick={() => {closeMenu(); navigate(newRecipeRoute)}}>Create Recipe</button></li>
        {user ? 
            <li><button onClick={() => {closeMenu(); handleSignOut()}}>Logout</button></li>
            : 
            <li><button onClick={() => {closeMenu(); navigate('/login') }}>Login</button></li>
        }
      </ul>
    </nav>
  )
}
