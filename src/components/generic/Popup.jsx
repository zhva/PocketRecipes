import React from 'react'
import arrow from '../../icons/Arrow.svg'
import removeIcon from '../../icons/remove-icon.svg'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'

export const Popup = ({ title, children, linkText, redirectLink, linkText2, redirectLink2, onClose, mode}) => {
  const navigate = useNavigate()
  return (
    <div className='popup-container'>
      <div className='popup-inner-container'>
          <div className='closing-headline-container'>
            <h1>{title}</h1>
              {mode !== 'protected' &&(
                <Button onClick={onClose}>
                  <img src={removeIcon}></img>
                </Button>
              )}
          </div>
          <hr></hr>
          <p>{children}</p>
          <div className='backlink-container'>
            <button aria-label={linkText} onClick= {() => navigate(redirectLink)}>
              <img src={arrow} alt="back arow"/>
              {<span>{linkText}</span>}
            </button>
          </div>
          {linkText2 && (
          <div className='backlink-container'>
            <button aria-label={linkText2} onClick= {() => navigate(redirectLink2)}>
              <img src={arrow} alt="back arow"/>
              {<span>{linkText2}</span> }
            </button>
          </div>
          )}
      </div>
    </div>
  )
}
