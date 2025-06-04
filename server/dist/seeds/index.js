// filepath: server/src/seeds/index.ts
// Update the path below if your mongoose connection file is located elsewhere
import connectDB from '../config/connection.js';
import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';
import { User } from '../models/user.js';
import { Ticket } from '../models/ticket.js';
const seed = async () => {
    try {
        await connectDB();
        // Clear existing records
        await User.deleteMany({});
        await Ticket.deleteMany({});
        // Seed users
        await seedUsers();
        const users = await User.find();
        // Seed tickets
        await seedTickets(users);
        console.log('✅ Seeded users and tickets');
        process.exit(0);
    }
    catch (err) {
        console.error('❌ Error during seeding:', err);
        process.exit(1);
    }
};
seed();
