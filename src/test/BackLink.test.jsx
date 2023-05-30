import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BackLink } from '../components/generic/BackLink';
import { useNavigate } from 'react-router-dom';
import arrow from '../icons/Arrow.svg';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('<BackLink />', () => {
  it('renders the BackLink component', () => {
    const { getByRole } = render(
      <BackLink>Back</BackLink>
    );

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('calls navigate with -1 when clicked', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const { getByRole } = render(
      <BackLink>Back</BackLink>
    );

    fireEvent.click(getByRole('button'));
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  it('renders with the correct classes', () => {
    const className = 'test-class';
    const { getByRole } = render(
      <BackLink className={className}>Back</BackLink>
    );

    expect(getByRole('button')).toHaveClass('custom-link', className);
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <BackLink>Back</BackLink>
    );

    expect(getByText('Back')).toBeInTheDocument();
  });

  it('renders arrow correctly', () => {
    const { getByAltText } = render(
      <BackLink>Back</BackLink>
    );

    expect(getByAltText('back arow')).toHaveAttribute('src', arrow);
  });
});
