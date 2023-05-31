import { render } from '@testing-library/react';
import { Recipe } from '../components/application/Recipe';
import { useParams, useNavigate } from 'react-router-dom';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('react-firebase-hooks/database', () => ({
  useObjectVal: jest.fn(),
}));

describe('Recipe', () => {
  beforeEach(() => {
    useParams.mockImplementation(() => ({ recipeId: '1' }));
    useAuthState.mockImplementation(() => [{ uid: '1' }]);
    useObjectVal.mockImplementation(() => [
      {
        imageLink: 'test-imageLink',
        values: {
          description: 'test-description',
          ingredients: [
            { id: 'ingredient1', name: 'Ingredient 1' },
            { id: 'ingredient2', name: 'Ingredient 2' },
          ],
          name: 'test-name',
          preparations: [
            { id: 'step1', description: 'Preparation Step 1' },
            { id: 'step2', description: 'Preparation Step 2' },
          ],
          servings: 'test-servings',
        },
      },
      false, // This is for loading state
    ]);
    useNavigate.mockImplementation(() => jest.fn()); // mock useNavigate
  });

  afterEach(() => {
    useParams.mockClear();
    useAuthState.mockClear();
    useObjectVal.mockClear();
    useNavigate.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<Recipe />);
    expect(getByText('test-name')).toBeInTheDocument();
  });
});
