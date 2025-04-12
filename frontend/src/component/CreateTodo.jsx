import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { ADD_TODO, GET_TODOS } from '../graphql';
import { Button } from '@/components/ui/button';

const CreateTodo = () => {
    const [newTodo, setNewTodo] = useState("");

    const [createTodo, { loading, error }] = useMutation(ADD_TODO, {
      update(cache, { data: { createTodo } }) {
        const { getTodos } = cache.readQuery({ query: GET_TODOS });
        cache.writeQuery({
          query: GET_TODOS,
          data: { getTodos: [...getTodos, createTodo] },
        });
      },
      onCompleted: () => {
        setNewTodo("");
      },
      onError: (err) => {
        console.error("Error adding todo:", err.message);
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
      <Button
        disabled={loading || !newTodo.trim()}
        className='bg-neutral-700 w-1/3 ml-auto p-2 rounded-sm text-white font-bold cursor-pointer hover:bg-neutral-900 hover:text-neutral-400 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={() => {
          if (!newTodo.trim()) return;
          createTodo({ variables: { title: newTodo, completed: false } });
        }}
      >
        {loading ? "Adding..." : "Add Todo"}
      </Button>

    </div>
  )
}

export default CreateTodo
