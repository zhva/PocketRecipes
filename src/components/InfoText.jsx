import React from 'react'
import './InfoText.scss'

export const InfoText = (props) => {
  return (
        <p className="starting-page-text">
            {props.children}
        </p>
  )
}
