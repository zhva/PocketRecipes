import React from 'react'

export const RecipeImage = (imageLink) => {
  return (
        <div className='img-container'>
                <img src={imageLink.imageLink}></img>
        </div>
  )
}
