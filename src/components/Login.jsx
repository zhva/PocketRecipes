import React, { useState } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { auth } from '../firebase'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

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
        setErrorMessage('An error occurred while signing in')
      }
    }
  })
  const { errors } = formik
  return { handleChange: formik.handleChange, handleSubmit: formik.handleSubmit, handleBlur: formik.handleBlur, values: formik.values, errors, errorMessage}
}

export const Login = () => {
  const { handleChange, handleSubmit, handleBlur, values, errors, errorMessage } = useLogin()
  return (
    <div className='login-container content-container'>
      <form onSubmit={handleSubmit} className='form-login'>
        <h1>Log In</h1>
        <h2>Welcome to PcketRecipes</h2>
        <div className='login-inner-container'>
          {errorMessage && <div className='formik-errors'>{errorMessage}</div>}
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
          <span className='formik-errors'>
            {errors.email}
          </span>
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
          <span className='formik-errors'>
            {errors.password}
          </span>
          <Button type="submit" variant="Log in">Log in</Button>
          <a href={'/signup'}>Don&apos;t have an account yet?</a>
        </div>
      </form>
    </div>
  )
}
