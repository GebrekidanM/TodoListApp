import { useMutation, useQuery } from '@apollo/client';
import React from 'react'
import { GET_TODOS, TOGGLE_TODO } from '../graphql';

const TodoList = () => {
    const { loading, data, error } = useQuery(GET_TODOS);

    const [toggleTodo] = useMutation(TOGGLE_TODO, {
        update(cache, { data: { toggleTodo } }) {
          const { getTodos } = cache.readQuery({ query: GET_TODOS});
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
    <div className='w-1/3'>
      <h2 className='font-bold text-neutral-300 text-2xl bg-neutral-900 p-2 rounded-t-sm mb-2'>Todo List</h2>
      <ul className='flex flex-col gap-2'>
        {data.getTodos.map((todo) => (
          <li 
              className='flex justify-between bg-neutral-300 p-2'
              key={todo.id} 
              onClick={() => toggleTodo({ variables: { id: todo.id } })}>
                 {todo.title} {todo.completed ? <p className='cursor-pointer'>✅</p> : <p className='cursor-pointer'><b>Say done</b></p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
