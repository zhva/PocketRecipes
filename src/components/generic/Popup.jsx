import React from 'react'
import arrow from '../../icons/Arrow.svg'

export const Popup = ({ title, children, linkText, linkText2}) => {
  return (
    <div className='popup-container'>
      <div className='popup-inner-container'>
          <h1>{title}</h1>
          <p>{children}</p>
          <div className='backlink-container'>
            <button>
              <img src={arrow} alt="back arow"/>
              {<a href="/login">{linkText}</a>}
            </button>
          </div>
          <div className='backlink-container'>
            <button>
              <img src={arrow} alt="back arow"/>
              { <a href="/signup">{linkText2}</a> }
            </button>
          </div>
      </div>
    </div>
  )
}
