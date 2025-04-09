import React, { useState } from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODO, GET_TODOS, ADD_TODO, TOGGLE_TODO } from './graphql';

function App() {
  const { loading, data, error } = useQuery(GET_TODOS);
  const { loading: singleLoading, data: singleData, error: singleError } = useQuery(GET_TODO, {
    variables: { id: 2 } // Ensure ID is an integer
  });

  const [newTodo, setNewTodo] = useState("");

  const [createTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { createTodo } }) {
      const { getTodos } = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: { getTodos: [...getTodos, createTodo] },
      });
    }
  });

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    update(cache, { data: { toggleTodo } }) {
      const { getTodos } = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          getTodos: getTodos.map(todo =>
            todo.id === toggleTodo.id ? { ...todo, completed: toggleTodo.completed } : todo
          ),
        },
      });
    }
  });

  if (loading) return <p>⏳ Loading Todos...</p>;
  if (error) return <p>❌ Error: {error.message}</p>;

  return (
    <div className="card">
      <h2>Todo List</h2>
      <ul>
        {data.getTodos.map((todo) => (
          <li key={todo.id} onClick={() => toggleTodo({ variables: { id: todo.id } })}>
            {todo.title} {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        placeholder="Enter task" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
      />
      <button onClick={() => {
        createTodo({ variables: { title: newTodo, completed: false } });
        setNewTodo(""); // Clear input after adding
      }}>
        Add Todo
      </button>
    </div>
  );
}

export default App;
