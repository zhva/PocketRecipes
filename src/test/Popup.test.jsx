import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Popup } from '../components/generic/Popup'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

afterEach(() => {
  mockNavigate.mockClear()
})

describe('<Popup />', () => {
  const title = 'Test Title'
  const children = 'Test children text'
  const linkText = 'Go back'
  const redirectLink = '/previous'
  const linkText2 = 'Try again'
  const redirectLink2 = '/retry'

  beforeEach(() => {
    render(
        <MemoryRouter initialEntries={['/popup']}>
          <Routes>
            <Route
              path="/popup"
              element={
                <Popup
                  title={title}
                  children={children}
                  linkText={linkText}
                  redirectLink={redirectLink}
                  linkText2={linkText2}
                  redirectLink2={redirectLink2}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      )
  })

  test('renders the Popup component with all the props', () => {
    const backButton = screen.getAllByRole('button')
    expect(backButton[0]).toBeInTheDocument()
    expect(backButton[1]).toBeInTheDocument()

    const titleElement = screen.getByRole('heading', { name: title })
    expect(titleElement.textContent).toBe(title)

    const childrenElement = screen.getByText(children)
    expect(childrenElement.textContent).toBe(children)
  })


  test('redirects to the correct route when the first button is clicked', () => {
    const navigate = useNavigate()

    const backButton = screen.getByRole('button', { name: linkText })
    fireEvent.click(backButton)

    expect(navigate).toHaveBeenCalledWith('/previous')
  })


  test('redirects to the correct route when the second button is clicked', () => {
    const tryAgainButton = screen.getByRole('button', { name: linkText2 })
    fireEvent.click(tryAgainButton)
    expect(mockNavigate).toHaveBeenCalledWith(redirectLink2)
  })

})
