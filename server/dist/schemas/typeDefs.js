import { gql } from 'apollo-server-express';
export default gql `
  type User {
    id: ID!
    username: String!
  }

  type Ticket {
    id: ID!
    name: String!
    description: String
    status: String!
    assignedUser: User
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    users: [User!]!
    tickets: [Ticket!]!
    ticket(id: ID!): Ticket
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    createUser(username: String!, password: String!): User!
    createTicket(name: String!, description: String, status: String!, assignedUserId: ID): Ticket!
    updateTicket(id: ID!, name: String, description: String, status: String, assignedUserId: ID): Ticket!
    deleteTicket(id: ID!): Boolean!
  }
`;
