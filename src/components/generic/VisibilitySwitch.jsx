import React from 'react'

export const VisibilitySwitch = ({ handleVisibilityChange, checked, name }) => {
  return (
    <div className='visibility-switch-container'>
      <span>Visibility in Homefeed</span>
      <div>
        <input
          type="checkbox"
          id="visibility-switch"
          name={name}
          onChange={handleVisibilityChange}
          checked={checked}
        />
        <label htmlFor="visibility-switch"></label>
      </div>
    </div>
  )
}
