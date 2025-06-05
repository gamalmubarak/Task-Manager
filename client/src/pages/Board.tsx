import { useQuery, useMutation, gql } from '@apollo/client';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import taskimage from '../assets/task-management.png';
import auth from '../utils/auth';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

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

const DELETE_TICKET = gql`
  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id) {
      success
      message
    }
  }
`;

const boardStates = ['To Do', 'In Progress', 'Done'];

const Board = () => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'status'>('name');
  const isLoggedIn = auth.loggedIn();

  const { loading, error, data, refetch } = useQuery(GET_TICKETS, {
    skip: !isLoggedIn,
  });

  const [deleteTicket] = useMutation(DELETE_TICKET, {
    onCompleted: () => refetch(),
    onError: () => {}, // Optionally handle error
  });

  // Filtering and sorting
  const filteredTickets = useMemo(() => {
    if (!data?.tickets) return [];
    return data.tickets
      .filter((ticket: any) =>
        ticket.name?.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a: any, b: any) =>
        (a[sortBy] || '').localeCompare(b[sortBy] || '')
      );
  }, [data, filter, sortBy]);

  // Delete handler
  const handleDeleteTicket = async (ticketId: string) => {
    await deleteTicket({ variables: { id: ticketId } });
  };

  if (!isLoggedIn) {
    return (
      <div className="login-notice">
        <img src={taskimage} alt="Task Manager" className="task-image" />
        <h1>Welcome to Task Manager App!</h1>
        <p>Let's get organized. Start by adding your first task and take control of your productivity.</p>
      </div>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorPage />;

  return (
    <div>
      <div className="board">
        <div className="controls">
          <input
            type="text"
            placeholder="Filter tickets"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="input-select"
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'name' | 'status')}
            className="input-select"
          >
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
       <Link to="/create">
         <button type="button" id="create-ticket-link" className="nav-btn">
         New Ticket
         </button>
       </Link>
        <div className="board-display">
          {boardStates.map(status => {
            const filteredByStatus = filteredTickets.filter(
              (ticket: any) => ticket.status === status
            );
            return (
              <Swimlane
                title={status}
                key={status}
                tickets={filteredByStatus}
                deleteTicket={handleDeleteTicket}
              />
            );
          })}
        </div>
      </div>
      <footer className="app-footer">
        <p>&copy; 2025 Task Manager App. All rights reserved.</p>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Board;