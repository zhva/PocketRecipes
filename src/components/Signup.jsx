import React, { useState } from 'react'
import { TextInput } from './TextInput'
import { Button } from './Button'
import { useFormik } from 'formik'
import { object, string, ref } from 'yup'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import './Signup.scss'

const validationSchema = object().shape({
  name: string(),
  email: string()
    .email('Invalid email format')
    .required('Email is a required field'),
  password: string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is a required filed'),
  passwordRepeat: string()
    .required('Please confirm your password')
    .oneOf([ref('password'), null], 'The passwords do NOT match!')
})

export const Signup = () => {
  const [signUp] = useCreateUserWithEmailAndPassword(auth)
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false)
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', passwordRepeat: '' },
    validationSchema,
    onSubmit: async (values) => {
      await signUp(values.email, values.password, values.name)
      setIsSignUpSuccessful(true)
    }
  })
  const navigate = useNavigate()

  if (isSignUpSuccessful) {
    navigate('/my-recipes')
  }

  return (
    <div className='signup-container content-container'>
      <form onSubmit={formik.handleSubmit} className='form-signup'>
        <h1>Sign Up</h1>
        <h2>Welcome to PcketRecipes</h2>
        <div className='signup-inner-container'>
            <TextInput
                type="text"
                name="name"
                label="Username"
                placeholder="Username"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="text"
            />
            <span className='formik-errors'>
                {formik.errors.name}
            </span>
            <TextInput
                type="email"
                name="email"
                label="E-Mail"
                placeholder="E-Mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="email"
            />
            <span className='formik-errors'>
                {formik.errors.email}
            </span>
            <TextInput
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="password"
            />
            <span className='formik-errors'>
                {formik.errors.password}
            </span>
            <TextInput
                type="password"
                name="passwordRepeat"
                label="Repeat Password"
                placeholder="Repeat Password"
                value={formik.values.passwordRepeat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                variant="password"
            />
            <span className='formik-errors'>
                {formik.errors.passwordRepeat}
            </span>
            <Button type="submit" variant="Sign up">Sign Up</Button>
            <a href={'/login'}>Already have an account?</a>
        </div>
      </form>
    </div>
  )
}
