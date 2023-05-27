import { BackLink } from './BackLink'
import React from 'react'

export const RecipeImage = (imageLink) => {
  return (
        <div className='img-container'>
          <BackLink className='back-btn' />
          <img src={imageLink.imageLink}></img>
        </div>
  )
}
