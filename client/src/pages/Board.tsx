import { useQuery, gql } from '@apollo/client';
// ...other imports...

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

interface Ticket {
  id: string;
  name: string;
  status: string;
  description: string;
  assignedUser?: {
    username: string;
  };
}

const Board = () => {
  const { loading, error, data } = useQuery(GET_TICKETS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tickets</div>;

  // Example usage of data.tickets:
  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {data?.tickets?.map((ticket: Ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.name}</strong> - {ticket.status}
            <div>{ticket.description}</div>
            <div>Assigned to: {ticket.assignedUser?.username}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;