import React from 'react'

export const RecipeImage = (props) => {
  return (
        <div className='img-container'>
                <img src={props.image}></img>
        </div>
  )
}
