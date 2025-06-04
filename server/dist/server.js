import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { User } from './models/index.js';
import jwt from 'jsonwebtoken';
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gamalmubarak87:password123!@cluster0.boislht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
async function startServer() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    await server.start();
    console.log('ApolloServer started.');
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req }) => {
            const authHeader = req.headers.authorization || '';
            const token = authHeader.replace('Bearer ', '');
            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secret');
                    const user = await User.findById(decoded.id);
                    return { user };
                }
                catch {
                    return {};
                }
            }
            return {};
        }
    }));
    app.use(express.static('../client/dist'));
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
}
startServer();
