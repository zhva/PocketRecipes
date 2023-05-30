import { render, screen } from '@testing-library/react'
import { SubHeadline } from '../components/generic/SubHeadline'

describe('SubHeadline component', () => {
  test('renders the provided children', () => {
    const childrenText = 'This is a sub headline'
    render(<SubHeadline>{childrenText}</SubHeadline>)
    expect(screen.getByText(childrenText)).toBeInTheDocument()
  })

  test('renders the correct HTML element', () => {
    render(<SubHeadline />)
    const headingElement = screen.getByRole('heading', { level: 2 })
    expect(headingElement).toBeInTheDocument()
  })
})
