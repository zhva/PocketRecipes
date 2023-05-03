import React from 'react'
import './Button.scss'

/**
 * Primary UI component for user interaction
 */

export const Button = (props) => {
  const backgroundColor = props.children === 'Get Started' ? 'rgb(225,215,198)' : 'rgb(87,155,178)'

  return (
    <button
      style={{ backgroundColor }}
      type={props.type}
      onClick={props.onClick}
      className="custom-button">
      { props.children }
    </button>
  )
}
