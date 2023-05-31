import { BackLink } from './BackLink'
import React from 'react'

export const RecipeImage = (imageLink) => {
  return (
        <div className='img-container'  data-testid='img-container'>
          <BackLink className='back-btn' />
          <img src={imageLink.imageLink}  alt="recipe image" ></img>
        </div>
  )
}
