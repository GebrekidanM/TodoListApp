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

export const  DELETE_TODO = gql`
  mutation DeleteTodo($id:Int!){
    deleteTodo(id:$id){
      id
      title
    }
  }
` 

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $title: String!) {
  updateTodo(id: $id, title: $title) {
    id
    title
    completed
  }
}
`