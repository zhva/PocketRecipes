import React from 'react'
import { Popup } from './Popup'

export const ProtectedRoute = ({ isAllowed, children }) => {
    const [isOpen] = React.useState(!isAllowed)

    if (isOpen) {
      return (
        <Popup
          title={'Create an account'}
          linkText={'Back to the Login page'}
          redirectLink={'/login'}
          linkText2={"Don't have an account yet?"}
          redirectLink2={'/signup'}
          mode = 'protected'
        >
          {
            "In order to use this functionality please Log in or create an account if you haven't done so to get full access to all features."
          }
        </Popup>
      )
    }

    return children
  }



