import React from 'react'
import { render } from '@testing-library/react'
import { InfoText } from '../components/generic/InfoText'

describe('<InfoText />', () => {
  it('renders the text correctly', () => {
    const text = 'This is the information text'
    const { getByText } = render(<InfoText>{text}</InfoText>)
    const textElement = getByText(text)
    expect(textElement).toBeInTheDocument()
  })

  it('applies the correct class name', () => {
    const text = 'This is the information text'
    const { getByText } = render(<InfoText>{text}</InfoText>)
    const textElement = getByText(text)
    expect(textElement).toHaveClass('starting-page-text')
  })
})
