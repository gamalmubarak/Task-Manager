import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from './Board';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom'; 
import { gql } from '@apollo/client';
import { vi } from 'vitest';
import auth from '../utils/auth';


const GET_TICKETS = gql`
  query {
    tickets {
      id
      name
      status
      description
      assignedUser { username }
    }
  }
`;

const mocks = [
  {
    request: { query: GET_TICKETS },
    result: {
      data: {
        tickets: [
           {
            id: '1',
            name: 'Test Ticket',
            status: 'To Do',
            description: 'desc',
            assignedUser: { username: 'user1' }
          }
        ],
      },
    },
  },
];


describe('Board', () => {
  beforeAll(() => {
    // Mock auth.loggedIn to always return true for tests
    vi.spyOn(auth, 'loggedIn').mockReturnValue(true);
  });

  it('renders tickets from GraphQL', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Board />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(await screen.findByText(/Test Ticket/)).toBeInTheDocument();
    expect(screen.getByText(/desc/)).toBeInTheDocument();
    expect(screen.getByText(/user1/)).toBeInTheDocument();
  });
});