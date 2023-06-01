import { render, fireEvent } from '@testing-library/react';
import { MyRecipes } from '../components/application/MyRecipes';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('react-firebase-hooks/database', () => ({
  useObjectVal: jest.fn(),
}));

describe('MyRecipes', () => {
  beforeEach(() => {
    useAuthState.mockImplementation(() => [{ uid: '1' }]);
    useObjectVal.mockImplementation(() => [
      {
        recipe1: {
          imageLink: 'test-imageLink1',
          values: {
            description: 'test-description1',
            name: 'test-name1',
          },
        },
        recipe2: {
          imageLink: 'test-imageLink2',
          values: {
            description: 'test-description2',
            name: 'test-name2',
          },
        },
      },
      false, // This is for loading state
    ]);
  });

  afterEach(() => {
    useAuthState.mockClear();
    useObjectVal.mockClear();
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<MyRecipes />);
    expect(getByText('My Recipes')).toBeInTheDocument();
  });

  it('displays recipes correctly', () => {
    const { getByText } = render(<MyRecipes />);
    expect(getByText('test-name1')).toBeInTheDocument();
    expect(getByText('test-name2')).toBeInTheDocument();
  });

  it('handles route changes correctly when a recipe is clicked', () => {
    const { getByText } = render(<MyRecipes />);
    fireEvent.click(getByText('test-name1').parentNode);
    expect(mockNavigate).toHaveBeenCalledWith('/my-recipes/recipe1');
  });
});
