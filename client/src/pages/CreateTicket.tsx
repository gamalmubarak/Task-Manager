import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
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
  const navigate = useNavigate();

  // Fetch users with Apollo Client
  const { data: usersData, loading: usersLoading } = useQuery(GET_USERS);

  // Apollo mutation for creating a ticket
  const [createTicketMutation, { error: mutationError }] = useMutation(CREATE_TICKET);

  // State for the new ticket
 const [newTicket, setNewTicket] = useState<TicketData>({
  id: '',
  name: '',
  description: '',
  status: 'To Do',
  assignedUserId: '',
  assignedUser: null
});

  // Set default assigned user after users are loaded
  useEffect(() => {
    if (usersData?.users.length && !newTicket.assignedUserId) {
      setNewTicket((prev) => ({
        ...prev,
        assignedUserId: usersData.users[0].id
      }));
    }
  }, [usersData, newTicket.assignedUserId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createTicketMutation({
        variables: {
          name: newTicket.name,
          description: newTicket.description,
          status: newTicket.status,
          assignedUserId: newTicket.assignedUserId,
        }
      });
      navigate('/');
    } catch (err) {
      // Error handled by mutationError
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  if (usersLoading) return <div>Loading users...</div>;
  if (mutationError) return <div>Error creating ticket: {mutationError.message}</div>;

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>
        <label htmlFor='tName'>Ticket Name</label>
        <input
          id='tName'
          name='name'
          value={newTicket.name}
          onChange={handleChange}
          required
        />
        <label htmlFor='tStatus'>Ticket Status</label>
        <select
          name='status'
          id='tStatus'
          value={newTicket.status}
          onChange={handleChange}
          className="input-select"
        >
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        <label htmlFor='tDescription'>Ticket Description</label>
        <textarea
          id='tDescription'
          name='description'
          value={newTicket.description}
          onChange={handleChange}
        />
        <label htmlFor='tUserId'>Assign to User</label>
        <select
          name='assignedUserId'
          id='tUserId'
          value={newTicket.assignedUserId}
          onChange={handleChange}
        >
          {usersData?.users.map((user: UserData) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <button type='submit'>Submit Form</button>
      </form>
    </div>
  );
};

export default CreateTicket;