import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from './Board';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';


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
            status: 'Todo',
            description: 'desc',
            assignedUser: { username: 'user1' }
          }
        ]
      }
    }
  }
];

describe('Board', () => {
  it('renders tickets from GraphQL', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Board />
      </MockedProvider>
    );
    expect(await screen.findByText(/Test Ticket/)).toBeInTheDocument();
    expect(screen.getByText(/desc/)).toBeInTheDocument();
    expect(screen.getByText(/user1/)).toBeInTheDocument();
  });
});