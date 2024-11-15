import React, { useState } from 'react'
import { Button } from '../generic/Button'
import { TextInput } from '../generic/TextInput'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { auth } from '../../firebase'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Popup } from '../generic/Popup'
import imgSrc from '../../images/auth-img.jpg'

const validationSchema = object({
  email: string().email('Invalid email format'),
  password: string().min(8, 'Password must be at least 8 characters')
})

const useLogin = () => {
  const [logIn] = useSignInWithEmailAndPassword(auth)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await logIn(values.email, values.password)
        if (userCredential.user) {
          navigate('/my-recipes')
        } else {
          setErrorMessage('Incorrect email or password')
        }
      } catch (error) {
        setErrorMessage('An error occurred while signing in. Try again.')
      }
    }
  })

  return { handleChange: formik.handleChange, handleSubmit: formik.handleSubmit, handleBlur: formik.handleBlur, values: formik.values, errorMessage, setErrorMessage}
}

export const Login = () => {
  const { handleChange, handleSubmit, handleBlur, values, errorMessage, setErrorMessage } = useLogin()

  const handleClosePopup = () => {
    setErrorMessage('')
  }

  return (
    <div className='login-page'>
      <div className='login-img-container'>
        <div>
          <img src={imgSrc}></img>
        </div>
      </div>
      <div className='login-container content-container'>
        {errorMessage && (
          <Popup
            title='Incorrect email or password'
            linkText='Go to Sign-up'
            redirectLink='/signup'
            onClose={handleClosePopup}>
              {errorMessage}
          </Popup>
        )}
        <form onSubmit={handleSubmit} className='form-login'>
          <h1>Sign-in</h1>
          <h2>Welcome! We are glad you are here!</h2>
          <div className='login-inner-container'>
            <TextInput
              type='email'
              name='email'
              label='E-Mail'
              id='eimal'
              className="text-input"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="E-Mail"
            />
            <TextInput
              type='password'
              name='password'
              label='Password'
              id='password'
              className="text-input"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password"
            />
            <Button type="submit" variant="Log in">Log in</Button>
            <a href={'/signup'}>Don&apos;t have an account yet?</a>
          </div>
        </form>
      </div>
    </div>
  )
}
