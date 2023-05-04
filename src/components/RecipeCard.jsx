import React from 'react'
import '../scss/RecipeCard.scss'

export const RecipeCard = ({ title, author, description, imageSrc, onClick }) => {
  return (
    <div className='card-container' onClick={onClick}>
        <div className='recipe-card-image-container'>
            <img src={imageSrc} alt="Recipe image"/>
        </div>
        <div className='recipe-card-info-container'>
          <h3>{title}</h3>
          <span>by {author}</span>
          <p>{description}</p>
        </div>
    </div>
  )
}
