import React from 'react'

export const NewImgButton = (props) => {
  return (
    <label htmlFor="imageUpload" className="label-image-upload">
        <input
            type="file"
            accept="image/*"
            onChange={props.handleChange}
            className='image-upload'
            id="imageUpload"/>
        <span>Choose new image</span>
    </label>
  )
}
