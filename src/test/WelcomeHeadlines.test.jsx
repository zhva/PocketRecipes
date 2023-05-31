import { render, screen } from '@testing-library/react'
import { WelcomeHeadline } from '../components/generic/WelcomeHeadline'
import React from 'react'

describe('WelcomeHeadline component', () => {
  test('renders correctly', () => {
    render(<WelcomeHeadline />)

    const headline = screen.getByRole('heading')
    expect(headline).toBeInTheDocument()
  })

  test('displays the correct text', () => {
    render(<WelcomeHeadline />)

    const welcomeText = screen.getByText('Welcome to')
    const appName = screen.getByText('PocketRecipes')

    expect(welcomeText).toBeInTheDocument()
    expect(appName).toBeInTheDocument()
  })
})
