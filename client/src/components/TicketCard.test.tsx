import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TicketCard from './TicketCard';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest'

const ticket = {
  id: 1,
  name: 'Test Ticket',
  description: 'Test Description',
  status: 'Todo',
  assignedUserId: 1,
  assignedUser: { id: 1, username: 'user1' }
};

describe('TicketCard', () => {
  it('renders ticket details', () => {
    render(
      <BrowserRouter>
        <TicketCard ticket={ticket} deleteTicket={vi.fn()} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Ticket')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('user1')).toBeInTheDocument();
  });

  it('calls deleteTicket when Delete button is clicked', () => {
    const mockDelete = vi.fn();
    render(
      <BrowserRouter>
        <TicketCard ticket={ticket} deleteTicket={mockDelete} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalled();
  });
});