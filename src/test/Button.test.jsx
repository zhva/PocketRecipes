import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '../components/generic/Button'

describe('<Button />', () => {
  let variant, onClick;

  beforeEach(() => {
    variant = 'default';
    onClick = jest.fn();
  })

  test('renders correctly', () => {
    const { getByRole } = render(
      <Button variant={variant} onClick={onClick}>Button Text</Button>
    );
    expect(getByRole('button')).toHaveTextContent('Button Text');
  });

  test('responds to click events', () => {
    const { getByRole } = render(
      <Button variant={variant} onClick={onClick}>Button Text</Button>
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  test('has correct className with default variant', () => {
    const { getByRole } = render(
      <Button variant={variant} onClick={onClick}>Button Text</Button>
    );
    expect(getByRole('button')).toHaveClass('custom-button');
  });

  test('has correct className with secondary variant', () => {
    variant = 'secondary';
    const { getByRole } = render(
      <Button variant={variant} onClick={onClick}>Button Text</Button>
    );
    expect(getByRole('button')).toHaveClass('custom-button secondary');
  });

  test('has correct className with non-secondary variant', () => {
    variant = 'not-secondary';
    const { getByRole } = render(
      <Button variant={variant} onClick={onClick}>Button Text</Button>
    );
    expect(getByRole('button')).toHaveClass('custom-button');
  });
});

