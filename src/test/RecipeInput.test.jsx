import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { RecipeInput } from '../components/generic/RecipeInput'

describe('<RecipeInput />', () => {
  const uuid = '1'
  const name = 'testName'
  const value = 'testValue'
  const handleDelete = jest.fn()
  const handleChange = jest.fn()
  const inputError = 'inputError'
  const index = 1

  it('renders the RecipeInput component', () => {
    const { getByRole } = render(
      <RecipeInput
        uuid={uuid}
        name={name}
        value={value}
        handleDelete={handleDelete}
        handleChange={handleChange}
        inputError={inputError}
        index={index}
      />
    )

    expect(getByRole('button')).toBeInTheDocument();
  })

  it('calls handleDelete when delete button is clicked', () => {
    const { getByRole } = render(
      <RecipeInput
        uuid={uuid}
        name={name}
        value={value}
        handleDelete={handleDelete}
        handleChange={handleChange}
        inputError={inputError}
        index={index}
      />
    )

    fireEvent.click(getByRole('button'))
    expect(handleDelete).toHaveBeenCalled()
  })

  it('calls handleChange when text area value is changed', () => {
    const { getByRole } = render(
      <RecipeInput
        uuid={uuid}
        name={name}
        value={value}
        handleDelete={handleDelete}
        handleChange={handleChange}
        inputError={inputError}
        index={index}
      />
    )

    fireEvent.change(getByRole('textbox'), { target: { value: 'new value' } })
    expect(handleChange).toHaveBeenCalled()
})


  it('renders inputError correctly', () => {
    const { getByText } = render(
      <RecipeInput
        uuid={uuid}
        name={name}
        value={value}
        handleDelete={handleDelete}
        handleChange={handleChange}
        inputError={inputError}
        index={index}
      />
    );

    expect(getByText(inputError)).toBeInTheDocument();
  });

  it('renders index correctly', () => {
    const { getByText } = render(
      <RecipeInput
        uuid={uuid}
        name={name}
        value={value}
        handleDelete={handleDelete}
        handleChange={handleChange}
        inputError={inputError}
        index={index}
      />
    );

    expect(getByText(`${index + 1}.`)).toBeInTheDocument();
  });
});
