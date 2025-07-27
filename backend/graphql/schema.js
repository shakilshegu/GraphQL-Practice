const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    name: String!
    email: String!
    age: Int!
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }
`;

module.exports = typeDefs;