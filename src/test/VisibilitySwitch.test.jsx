import { render, screen, fireEvent } from '@testing-library/react'
import { VisibilitySwitch } from '../components/generic/VisibilitySwitch'
import React from 'react'

describe('VisibilitySwitch component', () => {
  const mockProps = {
    handleVisibilityChange: jest.fn(),
    checked: true,
    name: 'visibility-switch',
  }

  test('renders correctly', () => {
    render(<VisibilitySwitch {...mockProps} />)

    const visibilityLabel = screen.getByText('Make the recipe public')
    expect(visibilityLabel).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  test('initial state matches checked prop', () => {
    render(<VisibilitySwitch {...mockProps} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.checked).toEqual(mockProps.checked)
  })

  test('handleVisibilityChange is called when checkbox is clicked', () => {
    render(<VisibilitySwitch {...mockProps} />)
    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    expect(mockProps.handleVisibilityChange).toHaveBeenCalled()
  })
})
