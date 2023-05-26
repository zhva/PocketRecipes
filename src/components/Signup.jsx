import React, { useState, useEffect } from 'react'
import { TextInput } from './TextInput'
import { Button } from './Button'
import { useFormik } from 'formik'
import { object, string, ref } from 'yup'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const validationSchema = object().shape({
  name: string()
    .max(100, 'The name is too long')
    .required('Name is a required field'),
  email: string()
    .email('Invalid email format')
    .max(100, 'The email is too long')
    .required('Email is a required field'),
  password: string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'The password is too long')
    .required('Password is a required filed'),
  passwordRepeat: string()
    .max(100, 'The password is too long')
    .required('Please confirm your password')
    .oneOf([ref('password'), null], 'The passwords do NOT match!')
})

const useSigup = () => {
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false)
  const [isEmailTaken, setIsEmailTaken] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', passwordRepeat: '' },
    validationSchema,
    onSubmit: async (values) => {
      setIsEmailTaken(false) // Reset the email taken state
      try {
        const emailExists = await fetchSignInMethodsForEmail(auth, values.email)
        if (emailExists.length) {
          setIsEmailTaken(true)
          return
        }
        await createUserWithEmailAndPassword(auth, values.email, values.password)
        setIsSignUpSuccessful(true)
        await signInWithEmailAndPassword(auth, values.email, values.password) // Auto sign-in after successful sign-up
      } catch (error) {
        console.error(error)
      }
    }
  })

  const { errors } = formik

  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent the form submission
    formik.handleSubmit()

    if (isEmailTaken) {
      setIsSignUpSuccessful(false)
    }
  }

  useEffect(() => {
    if (isSignUpSuccessful && !isEmailTaken) {
      setIsEmailTaken(false)
      navigate('/my-recipes')
    }
  }, [isSignUpSuccessful, isEmailTaken, navigate])

  return { handleSubmit, handleChange: formik.handleChange, handleBlur: formik.handleBlur, values: formik.values, submitCount: formik.submitCount, errors }
}

export const Signup = () => {
  const { handleSubmit, handleChange, handleBlur, values, submitCount, errors } = useSigup()
  const isSubmitted = submitCount > 0

  return (
    <div className='signup-page'>
      <div className='signup-container content-container'>
        <form onSubmit={handleSubmit} className='form-signup'>
          <h1>Sign Up</h1>
          <h2>Welcome to PocketRecipes</h2>
          <div className='signup-inner-container'>
              <TextInput
                  type="text"
                  name="name"
                  label="Username*"
                  placeholder="Username"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="text"
                  errors={isSubmitted && errors && errors.name}
              />
              <TextInput
                  type="email"
                  name="email"
                  label="E-Mail*"
                  placeholder="E-Mail"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="email"
                  errors={isSubmitted && errors && errors.email}
              />
              <TextInput
                  type="password"
                  name="password"
                  label="Password*"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="password"
                  errors={isSubmitted && errors && errors.password}
              />
              <TextInput
                  type="password"
                  name="passwordRepeat"
                  label="Repeat Password*"
                  placeholder="Repeat Password"
                  value={values.passwordRepeat}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="password"
                  errors={isSubmitted && errors && errors.passwordRepeat}
              />
              <Button type="submit" variant="Sign up">Sign Up</Button>
              <a href={'/login'}>Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  )
}
