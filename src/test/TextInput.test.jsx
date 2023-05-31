import { render, screen, fireEvent } from '@testing-library/react'
import { TextInput } from '../components/generic/TextInput'
import React from 'react'

describe('TextInput component', () => {
  const mockProps = {
    value: '',
    label: 'Username',
    name: 'username',
    placeholder: 'Enter your username',
    type: 'text',
    onChange: jest.fn(),
    errors: 'Username is required',
  }

  test('renders the label and input correctly', () => {
    render(<TextInput {...mockProps} />)

    const label = screen.getByText(mockProps.label)
    expect(label).toBeInTheDocument()

    const input = screen.getByPlaceholderText(mockProps.placeholder)
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', mockProps.type)
    expect(input).toHaveAttribute('name', mockProps.name)
    expect(input).toHaveValue(mockProps.value)
  })

  test('renders error message if errors prop is provided', () => {
    render(<TextInput {...mockProps} />)
    expect(screen.getByText(mockProps.errors)).toBeInTheDocument()
  })

  test('calls onChange callback when input value changes', () => {
    render(<TextInput {...mockProps} />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'testuser' } })
    expect(mockProps.onChange).toHaveBeenCalled()
  })
})
