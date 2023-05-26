import React from 'react'

/**
 * Primary UI component for user interaction
 */

export const Button = ({ variant = 'default', type, onClick, children }) => {
  let className = 'custom-button'

  if (variant === 'secondary') {
    className += ' secondary'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  )
}
