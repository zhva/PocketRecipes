import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RecipeCard } from '../components/generic/RecipeCard'

describe('<RecipeCard />', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    render(
      <RecipeCard
        title='Test Title'
        author='Test Author'
        description='Test Description'
        imageSrc='test.png'
        onClick={mockOnClick}
      />
    )
  })

  test('renders without crashing', () => {
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  test('displays the correct information based on props', () => {
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('by Test Author')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByAltText('Recipe image')).toBeInTheDocument()
  })

  test('onClick is called when the card is clicked', () => {
    fireEvent.click(screen.getByText('Test Title'))
    expect(mockOnClick).toHaveBeenCalled()
  })
})
