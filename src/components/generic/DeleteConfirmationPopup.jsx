import React from 'react'
import { Button } from './Button'

export const DeleteConfirmationPopup = ({ title, onClick, onClose, children }) => {
  return (
    <div className='delete-popup'>
      <div className='delete-popup-inner-container'>
          <h1>{title}</h1>
          <hr></hr>
          <p>{children}</p>
          <div className='confirmation-buttons'>
            <Button
              id='confirm'
              type={'button'}
              onClick={onClick}>Confirm</Button>
            <Button
              id='cancel'
              type={'button'}
              onClick={onClose}>Cancel</Button>
          </div>
      </div>
    </div>
  )
}
