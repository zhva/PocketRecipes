import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { NewImgButton } from '../components/generic/NewImgButton'

describe('<NewImgButton />', () => {

  const handleChangeMock = jest.fn()

  beforeEach(() => {
    render(<NewImgButton handleChange={handleChangeMock} />)
  })

  test('renders the NewImgButton component', () => {
    expect(screen.getByLabelText('Choose new image')).toBeInTheDocument()
  })

  test('renders the input file element', () => {
    expect(screen.getByLabelText('Choose new image')).toBeInTheDocument()
  })

  test('calls the handleChange function when input changes', () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const input = screen.getByLabelText('Choose new image')
    fireEvent.change(input, { target: { files: [file] } })
    expect(handleChangeMock).toHaveBeenCalled()
  })

})
