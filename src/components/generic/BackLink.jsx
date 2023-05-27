import React from 'react'
import arrow from '../../icons/Arrow.svg'
import { useNavigate } from 'react-router-dom'

/**
 * Primary UI component for user interaction
 */

export const BackLink = ({ children, className }) => {
  const linkClass = className ? `custom-link ${className}` : 'custom-link'
  const navigate = useNavigate()

  return (
    <div className='backlink-container' onClick={() => navigate(-1)}>
      <button
        className={linkClass}>
        <img src={arrow} alt="back arow"/>
        { children }
      </button>
    </div>
  )
}
