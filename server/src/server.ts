import dotenv from 'dotenv';
dotenv.config();

import './config/connection.js'; // Ensure Mongoose connects before anything else

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { User } from './models/index.js';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(express.json());

// Auth context for Apollo
app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'devsecret') as any;
        // Use Mongoose's findById instead of Sequelize's findByPk
        const user = await User.findById(decoded.id);
        return { user };
      } catch {
        return {};
      }
    }
    return {};
  }
}));

// Serve static files for client
app.use(express.static('../client/dist'));

// Start the server after Mongoose connection is open
import mongoose from 'mongoose';
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
});