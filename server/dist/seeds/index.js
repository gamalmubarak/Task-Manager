// filepath: server/src/seeds/index.ts
import mongoose from 'mongoose';
import '../config/connection.js';
import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';
const seedAll = async () => {
    try {
        await mongoose.connection.dropDatabase();
        await seedUsers();
        await seedTickets();
        console.log('\n----- DATABASE SEEDED -----\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
mongoose.connection.once('open', seedAll);
