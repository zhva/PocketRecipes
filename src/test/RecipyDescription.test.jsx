import { render, screen, fireEvent } from '@testing-library/react'
import { RecipeDescription } from '../components/generic/RecipeDescription'

let mockOnChange

describe('<RecipeDescription /> in edit mode', () => {
    beforeEach(() => {
        mockOnChange = jest.fn()
        render(
            <RecipeDescription
                description='Test description'
                descriptionErrors='Test error'
                handleChange={mockOnChange}
                mode='edit'
            />
        )
    })

    test('renders in edit mode without crashing', () => {
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Test description')).toBeInTheDocument()
        expect(screen.getByText('Test error')).toBeInTheDocument()
    })

    test('onChange is called when the description is changed in edit mode', () => {
        fireEvent.change(screen.getByDisplayValue('Test description'), { target: { value: 'New description' } })
        expect(mockOnChange).toHaveBeenCalled()
    })
})

describe('<RecipeDescription /> in display mode', () => {
    beforeEach(() => {
        render(
            <RecipeDescription
                description='Test description'
                descriptionErrors='Test error'
                handleChange={mockOnChange}
                mode='display'
            />
        )
    })

    test('renders in display mode without crashing and displays correct description', () => {
        expect(screen.getByText('Description')).toBeInTheDocument()
        expect(screen.getByText('Test description')).toBeInTheDocument()
    })

    test('renders errors correctly', () => {
        expect(screen.getByText('Test error')).toBeInTheDocument()
    })
})
