import { render, screen } from '@testing-library/react';
import Signup from './Signup';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';

describe('Signup Page', () => {
  it('renders signup form', () => {
    render(
      <MockedProvider>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });
});