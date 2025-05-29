import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';

const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

const CREATE_TICKET = gql`
  mutation CreateTicket($name: String!, $description: String, $status: String!, $assignedUserId: ID) {
    createTicket(name: $name, description: $description, status: $status, assignedUserId: $assignedUserId) {
      id
      name
      description
      status
      assignedUser { username }
    }
  }
`;

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null
  });

  const navigate = useNavigate();

  // Fetch users with Apollo Client
  const { data: usersData, loading: usersLoading } = useQuery(GET_USERS);

  // Apollo mutation for creating a ticket
  const [createTicketMutation] = useMutation(CREATE_TICKET);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newTicket) {
      await createTicketMutation({
        variables: {
          name: newTicket.name,
          description: newTicket.description,
          status: newTicket.status,
          assignedUserId: newTicket.assignedUserId,
        }
      });
      navigate('/');
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewTicket((prev) => ({ ...prev, assignedUserId: Number(value) }));
  };

  if (usersLoading) return <div>Loading users...</div>;

  return (
    <>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Create Ticket</h1>
          <label htmlFor='tName'>Ticket Name</label>
          <textarea
            id='tName'
            name='name'
            value={newTicket?.name || ''}
            onChange={handleTextAreaChange}
          />
          <label htmlFor='tStatus'>Ticket Status</label>
          <select
            name='status'
            id='tStatus'
            value={newTicket?.status || ''}
            onChange={handleTextChange}
          >
            <option value='Todo'>Todo</option>
            <option value='In Progress'>In Progress</option>
            <option value='Done'>Done</option>
          </select>
          <label htmlFor='tDescription'>Ticket Description</label>
          <textarea
            id='tDescription'
            name='description'
            value={newTicket?.description || ''}
            onChange={handleTextAreaChange}
          />
          <label htmlFor='tUserId'>User's ID</label>
          <select
            name='assignedUserId'
            value={newTicket?.assignedUserId || ''}
            onChange={handleUserChange}
          >
            {usersData?.users.map((user: UserData) => (
              <option key={user.id} value={String(user.id)}>
                {user.username}
              </option>
            ))}
          </select>
          <button type='submit'>Submit Form</button>
        </form>
      </div>
    </>
  );
};

export default CreateTicket;