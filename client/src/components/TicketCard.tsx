import { TicketData } from '../interfaces/TicketData';
import { useNavigate } from 'react-router-dom';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: string) => Promise<void>;
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (ticket.id) {
      try {
        await deleteTicket(ticket.id);
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  const handleEdit = () => {
    navigate('/edit', { state: { id: ticket.id } });
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <button type='button' onClick={handleEdit} className='editBtn'>Edit</button>
      <button type='button' onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;