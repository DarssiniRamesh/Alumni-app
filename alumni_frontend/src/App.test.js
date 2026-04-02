import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login/register page when unauthenticated', () => {
  render(<App />);
  // The login view headline toggles between "Login" and "Sign Up" - expect Login by default
  const heading = screen.getByText(/login/i);
  expect(heading).toBeInTheDocument();
});
