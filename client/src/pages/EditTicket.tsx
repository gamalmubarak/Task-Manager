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

  // Get the ticket id from location state
  const ticketId = state?.id;

  // Fetch the ticket data
  const { data, loading, error } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
    skip: !ticketId,
  });

  // Set up mutation for updating the ticket
  const [updateTicket] = useMutation(UPDATE_TICKET);

  // Local state for form
  const [ticket, setTicket] = useState<TicketData | undefined>();

  useEffect(() => {
    if (data && data.ticket) {
      setTicket(data.ticket);
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (ticket && ticket.id !== null) {
      await updateTicket({
        variables: {
          id: ticket.id,
          name: ticket.name,
          description: ticket.description,
          status: ticket.status,
        }
      });
      navigate('/');
    } else {
      console.error('Ticket data is undefined.');
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading ticket</div>;

  return (
    <>
      <div className='container'>
        {
          ticket ? (
            <form className='form' onSubmit={handleSubmit}>
              <h1>Edit Ticket</h1>
              <label htmlFor='tName'>Ticket Name</label>
              <textarea
                id='tName'
                name='name'
                value={ticket.name || ''}
                onChange={handleTextAreaChange}
              />
              <label htmlFor='tStatus'>Ticket Status</label>
              <select
                name='status'
                id='tStatus'
                value={ticket.status || ''}
                onChange={handleChange}
              >
                <option value='Todo'>Todo</option>
                <option value='In Progress'>In Progress</option>
                <option value='Done'>Done</option>
              </select>
              <label htmlFor='tDescription'>Ticket Description</label>
              <textarea
                id='tDescription'
                name='description'
                value={ticket.description || ''}
                onChange={handleTextAreaChange}
              />
              <button type='submit'>Submit Form</button>
            </form>
          ) : (
            <div>Issues fetching ticket</div>
          )
        }
      </div>
    </>
  );
};

export default EditTicket;