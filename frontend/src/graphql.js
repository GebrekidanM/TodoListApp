import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      id
      title
      completed
    }
  }
`;

export const GET_TODO = gql`
    query GetTodo {
        getTodo {
            id
            title
            completed
        }
    }
`

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`;
