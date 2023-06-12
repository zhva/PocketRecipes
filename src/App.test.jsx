import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'
import ProtectedRoute from './components/generic/ProtectedRoute'
import { StartingPage } from './components/application/StartingPage'


jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
  Routes: ({children}) => <div>{children}</div>,
  Route: ({path, element}) => <div>{element}</div>,
}));

jest.mock('./components/generic/ProtectedRoute', () => {
  return ({children}) => <div>{children}</div>;
});

jest.mock('./firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(() => () => {}),
  },
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [
    { uid: 'testUser', email: 'test@example.com' },  // mock user
    false,  // loading state
    null,  // error
    () => {},
  ],
}));


test('renders protected route', async () => {
  await render(
    <ProtectedRoute isAllowed={'test user'}>
      <StartingPage />
    </ProtectedRoute>
  );
});

