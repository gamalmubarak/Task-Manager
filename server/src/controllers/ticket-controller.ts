import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.js';


// GET /tickets
export const getAllTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find();
    return res.json(tickets);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /tickets/:id
export const getTicketById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    return res.json(ticket);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /tickets
export const createTicket = async (req: Request, res: Response) => {
  const { name, status, description, assignedUserId } = req.body;
  try {
    const newTicket = await Ticket.create({ name, status, description, assignedUserId });
    return res.status(201).json(newTicket);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// PUT /tickets/:id
export const updateTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status, description, assignedUserId } = req.body;
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { name, status, description, assignedUserId },
      { new: true }
    );
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    return res.json(ticket);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE /tickets/:id
export const deleteTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    return res.json({ message: 'Ticket deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
