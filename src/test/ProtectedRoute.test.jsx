import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/generic/ProtectedRoute'

describe('<ProtectedRoute />', () => {

  test('renders Popup when isAllowed is false', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute isAllowed={false}>Protected Content</ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Create an account')).toBeInTheDocument()
    expect(screen.getByText("In order to use this functionality please Log in or create an account if you haven't done so to get full access to all features.")).toBeInTheDocument()
  })

  test('renders children when isAllowed is true', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute isAllowed={true}>Protected Content</ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

})
