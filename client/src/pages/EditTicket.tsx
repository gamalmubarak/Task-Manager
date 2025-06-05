import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { TicketData } from '../interfaces/TicketData';

const GET_TICKET = gql`
  query GetTicket($id: ID!) {
    ticket(id: $id) {
      id
      name
      description
      status
      assignedUser { username }
    }
  }
`;

const UPDATE_TICKET = gql`
  mutation UpdateTicket($id: ID!, $name: String, $description: String, $status: String) {
    updateTicket(id: $id, name: $name, description: $description, status: $status) {
      id
      name
      description
      status
      assignedUser { username }
    }
  }
`;

const EditTicket = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const ticketId = state?.id;

  const { data, loading, error } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
    skip: !ticketId,
  });

  const [updateTicket, { loading: updating, error: updateError }] = useMutation(UPDATE_TICKET);

  const [ticket, setTicket] = useState<TicketData | undefined>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data && data.ticket) {
      setTicket(data.ticket);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (ticket && ticket.id !== null) {
      try {
        await updateTicket({
          variables: {
            id: ticket.id,
            name: ticket.name,
            description: ticket.description,
            status: ticket.status,
          }
        });
        setSuccess(true);
        setTimeout(() => navigate('/'), 1000); // Redirect after 1s
      } catch (err) {
        // Error handled by updateError
      }
    } else {
      console.error('Ticket data is undefined.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading ticket</div>;
  if (!ticket) return <div>Issues fetching ticket</div>;

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Edit Ticket</h1>
        <label htmlFor='tName'>Ticket Name</label>
        <input
          id='tName'
          name='name'
          value={ticket.name || ''}
          onChange={handleChange}
          required
        />
        <label htmlFor='tStatus'>Ticket Status</label>
        <select
          name='status'
          id='tStatus'
          value={ticket.status || ''}
          onChange={handleChange}
        >
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        <label htmlFor='tDescription'>Ticket Description</label>
        <textarea
          id='tDescription'
          name='description'
          value={ticket.description || ''}
          onChange={handleChange}
        />
        <button type='submit' disabled={updating}>
          {updating ? 'Updating...' : 'Submit Form'}
        </button>
        {updateError && <div style={{ color: 'red' }}>Error updating ticket: {updateError.message}</div>}
        {success && <div style={{ color: 'green' }}>Ticket updated!</div>}
      </form>
    </div>
  );
};

export default EditTicket;