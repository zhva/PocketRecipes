import { render, fireEvent, waitFor, findByText } from '@testing-library/react';
import { RecipeButtons } from '../components/generic/RecipeButtons';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';


jest.mock('clipboard-copy', () => jest.fn());

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

jest.mock('react-firebase-hooks/database', () => ({
  useObjectVal: jest.fn(),
}));

const mockNavigate = jest.fn(); // Define the mock navigate function

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate, // Use it here
}));


describe('RecipeButtons', () => {
  const mockNavigate = useNavigate();

  beforeEach(() => {
    useAuthState.mockImplementation(() => [{ uid: '1' }]);
    useObjectVal.mockImplementation(() => [
      {
        imageLink: 'test-imageLink',
        values: {
            description: 'test-description',
            name: 'test-name',
            visibility: true,
        },
        timestamp: new Date().getTime(),
      },
      false,
    ]);
  });

  afterEach(() => {
    useAuthState.mockClear();
    useObjectVal.mockClear();
    clipboardCopy.mockClear();
  });

  it('renders without crashing', () => {
    const { getByAltText } = render(<RecipeButtons recipeId="1" path="my-recipes" />);
    expect(getByAltText('Delete')).toBeInTheDocument();
    expect(getByAltText('Share')).toBeInTheDocument();
    expect(getByAltText('Edit')).toBeInTheDocument();
  });

  it('opens delete confirmation popup when delete button is clicked', () => {
    const { getByAltText, getByText } = render(<RecipeButtons recipeId="1" path="my-recipes" />);
    fireEvent.click(getByAltText('Delete'));
    expect(getByText('Confirm Delete')).toBeInTheDocument();
    expect(getByText('Do you really want to delete this recipe?')).toBeInTheDocument();
  });

  it('opens save popup when save button is clicked', async () => {
    const { getByAltText, findByText } = render(<RecipeButtons recipeId="1" path="feed" />);
    fireEvent.click(getByAltText('Save to my recipes'));
    
    const recipeSavedText = await findByText('Recipe Saved');
    expect(recipeSavedText).toBeInTheDocument();
    
    const savedToYourRecipesText = await findByText('The recipe has been saved to your recipes.');
    expect(savedToYourRecipesText).toBeInTheDocument();
  });
  
  it('opens share popup and copies link to clipboard when share button is clicked', async () => {
    const { getByAltText, findByText } = render(<RecipeButtons recipeId="1" path="my-recipes" />);
    fireEvent.click(getByAltText('Share'));
  
    const recipeSharedText = await findByText('Recipe Shared');
    expect(recipeSharedText).toBeInTheDocument();
    
    const sharedLinkCopiedText = await findByText('The recipe has been shared. The link has been copied to your clipboard.');
    expect(sharedLinkCopiedText).toBeInTheDocument();
    
    expect(clipboardCopy).toHaveBeenCalled();
  });
  
  it('navigates to edit recipe when edit button is clicked', async () => {
    const { getByAltText } = render(<RecipeButtons recipeId="1" path="my-recipes" />);
    fireEvent.click(getByAltText('Edit'));
    
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/edit/1'));
  });
  
});