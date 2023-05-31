import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { RecipeButtons } from '../components/generic/RecipeButtons'
import { getDatabase, ref, remove } from 'firebase/database'
import 'firebase/database'

// jest.mock('firebase/database', () => {
//   const recipeRef = {}
//   const mockRef = jest.fn().mockReturnValue(recipeRef)
//   const mockRemove = jest.fn().mockResolvedValue()
//   const mockGetDatabase = jest.fn(() => ({
//     ref: mockRef,
//     remove: mockRemove,
//   }))

//   return {
//     getDatabase: mockGetDatabase,
//     ref: mockRef,
//     remove: mockRemove,
//   }
// })


const mockUser = {
  uid: '123456'
}

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => mockUser
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

let mockNavigate

beforeEach(() => {
  mockNavigate = jest.fn()
  useNavigate.mockImplementation(() => mockNavigate)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('<RecipyButtons />', () => {

  test('renders RecipeButtons component without crashing', () => {
    render(
      <RecipeButtons recipeId="1" path="feed" />
    )
  })

  test('shows delete confirmation popup when delete button is clicked', () => {
    render(
      <RecipeButtons recipeId="1" path="my-recipes" />
    )
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)

    const deletePopup = screen.getByText(/do you really want to delete this recipe/i)
    expect(deletePopup).toBeInTheDocument()
  })

  // test('calls Firebase remove function when delete button is clicked', async () => {
  //   render(
  //     <RecipeButtons recipeId="1" path="my-recipes" />
  //   )

  //   const deleteButton = screen.getByRole('button', { name: /delete/i })
  //   fireEvent.click(deleteButton)
  //   const confirmButton = screen.getByRole('button', { name: /confirm/i })
  //   fireEvent.click(confirmButton)

  //   await waitFor(() => {
  //     expect(remove).toHaveBeenCalledWith(recipeRef)
  //   })
  // })

  test('calls navigate function with correct parameter when edit button is clicked', () => {
    render(
      <RecipeButtons recipeId="1" path="my-recipes" />
    )
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)

    expect(mockNavigate).toHaveBeenCalledWith(`/edit/1`)
  })
})
