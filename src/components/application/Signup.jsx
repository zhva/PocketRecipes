import React, { useState, useEffect } from 'react'
import { TextInput } from '../generic/TextInput'
import { Button } from '../generic/Button'
import { useFormik } from 'formik'
import { object, string, ref } from 'yup'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail} from 'firebase/auth'
import { auth, database } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { Popup } from '../generic/Popup'
import { set, ref as sref } from 'firebase/database'
import imgSrc from '../../images/auth-img.jpg'

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
      setIsEmailTaken(false); // Reset the email taken state
      try {
        const emailExists = await fetchSignInMethodsForEmail(auth, values.email)
        if (emailExists.length) {
          setIsEmailTaken(true)
          return;
        }
        const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password)
        setIsSignUpSuccessful(true);

        // Save the user's name to the database
        const nameRef = sref(database, `users/${user.uid}/name`)
        await set(nameRef, values.name)

        await signInWithEmailAndPassword(auth, values.email, values.password) // Auto sign-in after successful sign-up
      } catch (error) {
        alert(`The error occured while signing-up!: ${error}`)
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

  return { handleSubmit, handleChange: formik.handleChange, handleBlur: formik.handleBlur, values: formik.values, submitCount: formik.submitCount, errors, isEmailTaken, setIsEmailTaken }
}

export const Signup = () => {
  const { handleSubmit, handleChange, handleBlur, values, submitCount, errors, isEmailTaken, setIsEmailTaken } = useSigup()
  const isSubmitted = submitCount > 0

  const handleClosePopup = () => {
    setIsEmailTaken(false)
}

  return (
    <div className='signup-page'>
      <div className='login-img-container'>
        <div>
          <img src={imgSrc}></img>
        </div>
      </div>
      <div className='signup-container content-container'>
        { isEmailTaken && (
          <Popup
            title='The email is taken'
            linkText='Go to Sign-in'
            redirectLink='/login'
            onClose={handleClosePopup}>
              The email is already taken! Try to sign in with this email.
          </Popup>
        )}
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
