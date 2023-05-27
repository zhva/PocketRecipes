import React from 'react'
import { Button } from './Button'

export const DeleteConfirmationPopup = ({ title, onClick, onClose, children }) => {
  return (
    <div className='delete-popup'>
      <div className='delete-popup-inner-container'>
          <h1>{title}</h1>
          <p>{children}</p>
          <div className='confirmation-buttons'>
            <Button
              type={'button'}
              onClick={onClick}>Confirm</Button>
            <Button
              variant='secondary'
              type={'button'}
              onClick={onClose}>Cancel</Button>
          </div>
      </div>
    </div>
  )
}
