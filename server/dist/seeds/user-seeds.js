import { User } from '../models/user.js';
export const seedUsers = async () => {
    await User.deleteMany({});
    for (const user of [
        { username: 'JollyGuru', password: 'password' },
        { username: 'SunnyScribe', password: 'password' },
        { username: 'RadiantComet', password: 'password' },
    ]) {
        const newUser = new User(user);
        await newUser.save(); // This triggers pre-save hook for hashing
    }
};
