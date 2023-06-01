import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AddInput } from '../components/generic/AddInput'

describe('<AddInput />', () => {
  const items = [
    { id: '1', name: 'item1' },
    { id: '2', name: 'item2' },
  ]
  const errors = ['error1', 'error2']
  const name = 'testName'
  const handleAdd = jest.fn()
  const handleDelete = jest.fn()
  const handleChange = jest.fn()

  it('renders the AddInput component', () => {
    const { getByAltText } = render(
      <AddInput
        items={items}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChange={handleChange}
        name={name}
        errors={errors}
      />
    )
    expect(getByAltText('add-btn')).toBeInTheDocument()
  })

  it('calls handleAdd when add button is clicked', () => {
    const { getByAltText } = render(
      <AddInput
        items={items}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChange={handleChange}
        name={name}
        errors={errors}
      />
    )
    fireEvent.click(getByAltText('add-btn'))
    expect(handleAdd).toHaveBeenCalled()
  })

  it('renders RecipeInput for each item', () => {
    const { getAllByRole } = render(
      <AddInput
        items={items}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChange={handleChange}
        name={name}
        errors={errors}
      />
    )
    expect(getAllByRole('textbox').length).toBe(items.length)
  })

  it('calls handleDelete when delete button in RecipeInput is clicked', () => {
    const items = [
      { id: '1', name: 'item1' },
      { id: '2', name: 'item2' },
    ]
    const handleDelete = jest.fn()
    const { getAllByText } = render(
      <AddInput
        items={items}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChange={handleChange}
        name={name}
        errors={errors}
      />
    )
    getAllByText('X').forEach((button) => {
      fireEvent.click(button)
    })
    expect(handleDelete).toHaveBeenCalledTimes(items.length)
  })

  it('renders RecipeInput error for each item correctly', () => {
    const items = [
      { id: '1', name: 'item1' },
      { id: '2', name: 'item2' },
    ]
    const errors = [{ name: 'error1' }, { name: 'error2' }]
    const { getAllByText } = render(
      <AddInput
        items={items}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChange={handleChange}
        name={name}
        errors={errors}
      />
    )
    errors.forEach((error) => {
      expect(getAllByText(error.name).length).toBe(1)
    })
  })

  it('renders a string error correctly', () => {
    const errorText = "Some error text";
    const { getByText } = render(
      <AddInput
        items={items}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChange={handleChange}
        name={name}
        errors={errorText}
      />
    )
    expect(getByText(errorText)).toBeInTheDocument()
  })
})
