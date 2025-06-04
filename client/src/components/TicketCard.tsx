import { TicketData } from '../interfaces/TicketData';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: string) => Promise<void>;
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const handleDelete = async () => {
    if (ticket.id) {
      try {
        await deleteTicket(ticket.id);
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <button type='button' onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;
