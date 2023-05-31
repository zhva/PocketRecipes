import React from 'react'
import { render } from '@testing-library/react'
import { IngredientPreparationLists } from '../components/generic/IngredientPreparationLists'

describe('<IngredientPreparationLists />', () => {
  it('renders the ingredients correctly', () => {
    const ingredients = [
      { id: 1, name: 'Ingredient 1' },
      { id: 2, name: 'Ingredient 2' },
      { id: 3, name: 'Ingredient 3' },
    ]

    const { getByText } = render(
      <IngredientPreparationLists ingredients={ingredients} preparationSteps={[]} />
    )

    ingredients.forEach((ingredient) => {
      const ingredientElement = getByText(ingredient.name)
      expect(ingredientElement).toBeInTheDocument()
    })
  })

  it('renders the preparation steps correctly', () => {
    const preparationSteps = [
      { id: 1, name: 'Step 1' },
      { id: 2, name: 'Step 2' },
      { id: 3, name: 'Step 3' },
    ]

    const { getByText } = render(
      <IngredientPreparationLists ingredients={[]} preparationSteps={preparationSteps} />
    )

    preparationSteps.forEach((step) => {
      const stepElement = getByText(step.name)
      expect(stepElement).toBeInTheDocument()
    })
  })
})
