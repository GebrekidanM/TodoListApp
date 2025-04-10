import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { ADD_TODO, GET_TODOS } from '../graphql';

const CreateTodo = () => {
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

  return (
    <div className='flex flex-col gap-3 w-1/4 ml-[25%]'>
      <h2 className='font-bold text-neutral-300 text-2xl bg-neutral-900 p-2 rounded-t-sm'>Create your activities</h2>
      <input 
        className='p-2 border border-neutral-500 rounded-sm '
        type="text" 
        placeholder="Enter task" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
      />
      <button 
        className='bg-neutral-700 w-1/3 ml-auto p-2 rounded-sm text-white font-bold cursor-pointer hover:bg-neutral-900 hover:text-neutral-400 transition-colors duration-150 '
        onClick={() => {
          createTodo({ variables: { title: newTodo, completed: false } });
          setNewTodo("");
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

export default CreateTodo
