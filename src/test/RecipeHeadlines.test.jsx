import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RecipeHeadlines } from '../components/generic/RecipeHeadlines'

describe('<RecipeHeadlines />', () => {

    const mockHandleChange = jest.fn()

    beforeEach(() => {
        render(
            <RecipeHeadlines
                recipeName='Test recipe'
                servings={4}
                handleChange={mockHandleChange}
                mode='create'
                nameErrors='Test name error'
                servingsErrors='Test servings error'
            />
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('renders in create mode without crashing and displays correct inputs', () => {
        expect(screen.getByLabelText('recipeName')).toBeInTheDocument()
        expect(screen.getByLabelText('recipeServings')).toBeInTheDocument()
    })

    test('inputs trigger onChange events correctly', () => {
        fireEvent.change(screen.getByLabelText('recipeName'), { target: { value: 'New recipe' } })
        fireEvent.change(screen.getByLabelText('recipeServings'), { target: { value: 5 } })

        expect(mockHandleChange).toHaveBeenCalledTimes(2)
    })

    test('renders errors correctly', () => {
        expect(screen.getByText('Test name error')).toBeInTheDocument()
        expect(screen.getByText('Test servings error')).toBeInTheDocument()
    })

    test('renders in display mode without crashing and displays correct content', () => {
        render(<RecipeHeadlines recipeName='Test recipe' servings={4} handleChange={mockHandleChange} mode='display' nameErrors='Test name error' servingsErrors='Test servings error' />)
        expect(screen.getByText('Test recipe')).toBeInTheDocument()
        expect(screen.getByText('4')).toBeInTheDocument()
    })

})
