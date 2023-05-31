import { cleanup, render, screen, act } from '@testing-library/react'
import React from 'react'
import { CreateRecipe } from '../components/application/CreateRecipe'

jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(() => ({
      ref: jest.fn(),
    })),
    ref: jest.fn(),
    push: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }))

jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(() => ({
      ref: jest.fn(),
    })),
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
  }))

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({})),
  }))

jest.mock('react-firebase-hooks/database', () => ({
    useObjectVal: () => [null, false],
  }))

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: () => [{}],
  }))

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
    useParams: () => ({}),
  }))

afterEach(cleanup)

test('CreateRecipe renders without crashing', async () => {
  await act(() => {
    render(<CreateRecipe />);
  })
})
