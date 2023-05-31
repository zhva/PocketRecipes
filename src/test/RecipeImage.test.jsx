import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RecipeImage } from '../components/generic/RecipeImage'

describe('RecipeImage component', () => {
  const mockImageLink = 'https://test.com/test.jpg'

  beforeEach(() => {
    render(
      <MemoryRouter>
        <RecipeImage imageLink={mockImageLink} />
      </MemoryRouter>
    )
  })

  test('renders without crashing', () => {
    const container = screen.getByTestId('img-container')
    expect(container).toBeInTheDocument()
  })


  test('renders the correct image based on imageLink prop', () => {
    const image = screen.getByAltText('recipe image')
    expect(image).toHaveAttribute('src', mockImageLink)
  })

  test('renders BackLink', () => {
    const backLink = screen.getByRole('button', { name: 'back arow' })
    expect(backLink).toBeInTheDocument()
  })
})
