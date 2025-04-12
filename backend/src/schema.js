const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Todo {
    id: Int!
    title: String!
    completed:Boolean!
  }

  type Query {
    getTodos: [Todo!]!
    getTodo(id: Int!): Todo
  }

  type Mutation {
    createTodo(title: String!):Todo
    toggleTodo(id:Int!):Todo
    deleteTodo(id:Int!):Todo
  }
`;

module.exports = { typeDefs };
