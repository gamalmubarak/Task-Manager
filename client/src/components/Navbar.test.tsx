import { vi, expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import auth from '../utils/auth';


vi.mock('../utils/auth', () => ({
  default: {
    loggedIn: vi.fn(() => false),
    logout: vi.fn(),
  }
}));

describe('Navbar', () => {
  it('renders Login button when not logged in', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('renders Logout button when logged in', () => {
   
    (auth.loggedIn as vi.Mock).mockReturnValue(true);

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});