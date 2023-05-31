import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
import { NavBar } from '../components/generic/NavigationBar'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}))

describe('<NavBar />', () => {
  const startingPageRoute = '/'
  const myRecipesRoute = '/my-recipes'
  const feedRoute = '/feed'
  const newRecipeRoute = '/new-recipe'

  beforeEach(() => {
    useLocation.mockReturnValue({ pathname: startingPageRoute })
  })

  it('renders the navigation bar correctly', () => {
    render(
      <MemoryRouter>
        <NavBar
          startingPageRoute={startingPageRoute}
          myRecipesRoute={myRecipesRoute}
          feedRoute={feedRoute}
          newRecipeRoute={newRecipeRoute}
          user={null}
        />
      </MemoryRouter>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('PocketRecipes')).toBeInTheDocument()
  })

it('marks the hamburger menu as opened based on the state', async () => {
    useLocation.mockReturnValue({ pathname: startingPageRoute })

    render(
      <MemoryRouter>
        <NavBar
          startingPageRoute={startingPageRoute}
          myRecipesRoute={myRecipesRoute}
          feedRoute={feedRoute}
          newRecipeRoute={newRecipeRoute}
          user={null}
        />
      </MemoryRouter>
    )

    const menuButton = screen.getByRole('button', { name: 'hamburger' })
    expect(menuButton).toHaveClass('closed')

    await act(async () => {
      fireEvent.click(menuButton)
    })

    expect(menuButton).toHaveClass('opened')
  })

  it('navigates to the correct route when buttons are clicked', () => {
    const navigate = jest.fn()
    useLocation.mockReturnValue({ pathname: startingPageRoute })
    useNavigate.mockReturnValue(navigate)
    render(
      <MemoryRouter>
        <NavBar
          startingPageRoute={startingPageRoute}
          myRecipesRoute={myRecipesRoute}
          feedRoute={feedRoute}
          newRecipeRoute={newRecipeRoute}
          user={null}
        />
      </MemoryRouter>
    )

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Home' }))
    })
    expect(navigate).toHaveBeenCalledWith(startingPageRoute)

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'My Recipes' }))
    })
    expect(navigate).toHaveBeenCalledWith(myRecipesRoute)

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Feed' }))
    })
    expect(navigate).toHaveBeenCalledWith(feedRoute)

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Create Recipe' }))
    })
    expect(navigate).toHaveBeenCalledWith(newRecipeRoute)
  })

  it('logs out and navigates to the login page when logged in and logout button is clicked', async () => {
    const navigate = jest.fn()
    useLocation.mockReturnValue({ pathname: startingPageRoute })
    useNavigate.mockReturnValue(navigate)

    await act(async () => {
      render(
        <MemoryRouter>
          <NavBar
            startingPageRoute={startingPageRoute}
            myRecipesRoute={myRecipesRoute}
            feedRoute={feedRoute}
            newRecipeRoute={newRecipeRoute}
            user={{ name: 'Test User' }}
          />
        </MemoryRouter>
      )
    })

    const logoutButton = screen.getByRole('button', { name: 'Logout' })
    if (logoutButton) {
      await act(async () => {
        fireEvent.click(logoutButton)
      })
    }

    expect(navigate).toHaveBeenCalledWith('/login')
  })

  it('navigates to the starting page route when the title is clicked', () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    render(
      <MemoryRouter>
        <NavBar
          startingPageRoute={startingPageRoute}
          myRecipesRoute={myRecipesRoute}
          feedRoute={feedRoute}
          newRecipeRoute={newRecipeRoute}
          user={null}
        />
      </MemoryRouter>
    )

    act(() => {
      fireEvent.click(screen.getByText('PocketRecipes'))
    })

    expect(navigate).toHaveBeenCalledWith(startingPageRoute)
  })

  it('navigates to the login page when the Login button is clicked and the user is not authenticated', () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    render(
      <MemoryRouter>
        <NavBar
          startingPageRoute={startingPageRoute}
          myRecipesRoute={myRecipesRoute}
          feedRoute={feedRoute}
          newRecipeRoute={newRecipeRoute}
          user={null}
        />
      </MemoryRouter>
    )

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    })

    expect(navigate).toHaveBeenCalledWith('/login')
  })
})
