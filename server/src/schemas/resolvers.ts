import { User } from '../models/user.js';
import { Ticket } from '../models/ticket.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

export default {
  Query: {
    me: async (_: any, __: any, { user }: any) => user,
    users: async () => User.find().select('-password'),
    tickets: async () => Ticket.find().populate('assignedUser', 'username'),
    ticket: async (_: any, { id }: any) => Ticket.findById(id).populate('assignedUser', 'username'),
  },
  Mutation: {
    login: async (_: any, { username, password }: any) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('Invalid credentials');
      const valid = await user.comparePassword(password);
      if (!valid) throw new Error('Invalid credentials');
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    createUser: async (_: any, { username, password }: any) => {
      const user = new User({ username, password });
      await user.save();
      return user;
    },
    createTicket: async (_: any, args: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
      const ticket = new Ticket({ ...args, assignedUser: args.assignedUserId || user._id });
      await ticket.save();
      return ticket.populate('assignedUser', 'username');
    },
    updateTicket: async (_: any, { id, ...fields }: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
      const ticket = await Ticket.findByIdAndUpdate(id, fields, { new: true }).populate('assignedUser', 'username');
      if (!ticket) throw new Error('Ticket not found');
      return ticket;
    },
    deleteTicket: async (_: any, { id }: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
      const ticket = await Ticket.findByIdAndDelete(id);
      return !!ticket;
    },
  }
};