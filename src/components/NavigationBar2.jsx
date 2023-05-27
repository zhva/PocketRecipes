import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavBar = ({startingPageRoute, myRecipesRoute, feedRoute, newRecipeRoute}) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

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
        <li><a onClick={() => {closeMenu(); navigate(startingPageRoute)}} href="#link1">Home</a></li>
        <li><a onClick={() => {closeMenu(); navigate(myRecipesRoute)}} href="#link2">My Recipes</a></li>
        <li><a onClick={() => {closeMenu(); navigate(feedRoute)}} href="#link3">Feed</a></li>
        <li><a onClick={() => {closeMenu(); navigate(newRecipeRoute)}} href="#link4">Create Recipe</a></li>

        {/* ... other links ... */}
      </ul>
    </nav>
  )
}
