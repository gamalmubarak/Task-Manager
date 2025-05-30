import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import Login from './Login';
import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: { username: 'testuser', password: 'secret' },
    },
    result: {
      data: { login: { token: 'mocktoken' } },
    },
  },
];

describe('Login Page', () => {
  it('renders login form', () => {
    render(
      <MockedProvider>
        <Login />
      </MockedProvider>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows error on failed login', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Login />
      </MockedProvider>
    );
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() =>
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument()
    );
  });
});