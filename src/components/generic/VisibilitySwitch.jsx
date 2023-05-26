import React from 'react'

export const VisibilitySwitch = ({ HandleChange }) => {
  return (
    <div className='visibility-switch-container'>
      <span>Visibility in Homefeed</span>
      <div>
        <input
          type="checkbox"
          id="visibility-switch"
          onChange={HandleChange}
        />
        <label htmlFor="visibility-switch"></label>
      </div>
    </div>
  )
}
