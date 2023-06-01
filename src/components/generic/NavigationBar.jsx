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
          <h1 onClick={() => {navigate(startingPageRoute)}}>PocketRecipes</h1>
        </div>
        <div>
          <button
            aria-label="hamburger"
            className={`hamburger ${isOpen ? "opened" : "closed"}`}
            onClick={toggleMenu}
            >
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </button>
          </div>
        </div>
      <ul className={isOpen ? "transition" : ""}  aria-label="menu">
        <li><button onClick={() => {closeMenu(); navigate(startingPageRoute)}}>Home</button></li>
        <li><button onClick={() => {closeMenu(); navigate(myRecipesRoute)}}>My Recipes</button></li>
        <li><button onClick={() => {closeMenu(); navigate(feedRoute)}}>Discover Recipes</button></li>
        <li><button onClick={() => {closeMenu(); navigate(newRecipeRoute)}}>Create Recipe</button></li>
        <hr className='burger'></hr>
        {user ?
            <li id='login-signup-nav'><button onClick={() => {closeMenu(); handleSignOut()}}>Logout</button></li>
            :
            (
              <>
                <li id='login-signup-nav1'><button onClick={() => {closeMenu(); navigate('/login') }}>Login</button></li>
                <li id='login-signup-nav1'><button onClick={() => {closeMenu(); navigate('/signup') }}>Sign up</button></li>
              </>
            )
        }
      </ul>
    </nav>
  )
}
