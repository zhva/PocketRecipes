import { render, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '../components/application/Login'
import { useNavigate } from 'react-router-dom'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

jest.mock('react-firebase-hooks/auth')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('Login component', () => {
  test('renders without crashing', () => {
    useSignInWithEmailAndPassword.mockReturnValue([jest.fn(), false, undefined])
    useNavigate.mockReturnValue(jest.fn())
    const { getByText } = render(<Login />)
    expect(getByText('Sign-in')).toBeInTheDocument()
  })

  test('calls the login function when form is submitted', async () => {
    const mockSignIn = jest.fn()
    useSignInWithEmailAndPassword.mockReturnValue([mockSignIn, false, undefined])
    const mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)
    const { getByLabelText, getByRole } = render(<Login />)

    fireEvent.change(getByLabelText('E-Mail'), {
      target: { value: 'test@mail.com' },
    })
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'password' },
    })
    fireEvent.submit(getByRole('button'))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledTimes(1)
      expect(mockSignIn).toHaveBeenCalledWith('test@mail.com', 'password')
    })
  })
})
