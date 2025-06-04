import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { User } from './user.js';
import { Ticket } from './ticket.js';

const connectDB = async () => {
try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || '', {
      dbName: process.env.MONGODB_DB || 'ticketApp',
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export { connectDB, User, Ticket };
