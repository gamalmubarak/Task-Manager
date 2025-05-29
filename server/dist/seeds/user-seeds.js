import { User } from '../models/user.js';
export const seedUsers = async () => {
    await User.create([
        { username: 'JollyGuru', password: 'password' },
        { username: 'SunnyScribe', password: 'password' },
        { username: 'RadiantComet', password: 'password' },
    ]);
};
