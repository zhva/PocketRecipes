import React from 'react'
import arrow from '../../icons/Arrow.svg'
import { useNavigate } from 'react-router-dom';

export const Popup = ({ title, children, linkText, linkText2}) => {
  const navigate = useNavigate()
  return (
    <div className='popup-container'>
      <div className='popup-inner-container'>
          <h1>{title}</h1>
          <p>{children}</p>
          <div className='backlink-container'>
            <button onClick= {() => navigate(`/login`)}>
              <img src={arrow} alt="back arow"/>
              {<span>{linkText}</span>}
            </button>
          </div>
          <div className='backlink-container'>
            <button onClick= {() => navigate(`/signup`)}>
              <img src={arrow} alt="back arow"/>
              {<span>{linkText2}</span> }
            </button>
          </div>
      </div>
    </div>
  )
}
