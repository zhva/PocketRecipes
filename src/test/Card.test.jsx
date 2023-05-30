import React from 'react'
import { render } from '@testing-library/react'
import { Card } from '../components/generic/Card'

describe('<Card />', () => {
  it('renders children correctly', () => {
    const children = <div>Test Content</div>
    const { getByText } = render(<Card>{children}</Card>)
    expect(getByText('Test Content')).toBeInTheDocument()
  })
})
