import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TODOS, TOGGLE_TODO, DELETE_TODO, UPDATE_TODO } from '../graphql';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast'; 
import { FaPenSquare } from "react-icons/fa";
import { MdFolderDelete } from "react-icons/md";

const TodoList = () => {
  const { loading, data, error } = useQuery(GET_TODOS);

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

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

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(cache, { data: { deleteTodo } }) {
      const { getTodos } = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          getTodos: getTodos.filter(todo => todo.id !== deleteTodo.id),
        },
      });
    },
    onCompleted() { toast.success("Todo deleted ✅"); },
    onError(err) { toast.error(`${err.message}`); }
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    update(cache, { data: { updateTodo } }) {
      const { getTodos } = cache.readQuery({ query: GET_TODOS });
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          getTodos: getTodos.map(todo=> todo.id === updateTodo.id ? updateTodo : todo)
        },
      });
    },
    onCompleted() { 
      toast.success("Todo updated ✏️");
      setEditingId(null);
      setEditedTitle("");
    },
    onError(err) { toast.error(`Error updating todo: ${err.message}`);}
  });

  if (loading) return <p>⏳ Loading Todos...</p>;
  if (error) return <p>❌ Error: {error.message}</p>;

  return (
    <div className='w-1/3'>
      <h2 className='font-bold text-neutral-300 text-2xl bg-neutral-900 p-2 rounded-t-sm mb-2'>Todo List</h2>
      <div className='flex flex-col gap-2'>
        {data.getTodos.map((todo) => (
          <div 
            className='flex justify-between bg-neutral-300 p-2 items-center'
            key={todo.id}
            onClick={() => toggleTodo({ variables: { id: todo.id } })}
          >
           {editingId === todo.id ? (
  <div className="flex w-full gap-2">
    <input
      type="text"
      value={editedTitle}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => setEditedTitle(e.target.value)}
      className="border px-2 py-1 rounded w-full"
    />
    <Button
      onClick={(e) => {
        e.stopPropagation();
        if (editedTitle.trim() === "") {
          toast.error("Title can't be empty ❌");
          return;
        }
        updateTodo({ variables: { id: todo.id, title: editedTitle } });
      }}
      className="bg-green-600 hover:bg-green-700"
    >
      Save
    </Button>
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setEditingId(null);
        setEditedTitle("");
      }}
      className="bg-gray-400 hover:bg-gray-500"
    >
      Cancel
    </Button>
  </div>
) : (
  <>
    <p>{todo.title}</p>
    <div className='flex items-center gap-4'>
      {todo.completed ? (
        <p className='font-semibold text-green-700 cursor-pointer'>Completed</p>
      ) : (
        <p className='font-semibold text-yellow-700 cursor-pointer'>Pending</p>
      )}
      <MdFolderDelete 
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo({ variables: { id: todo.id } });
        }}
        className='text-red-600 cursor-pointer'
      />
      <FaPenSquare 
        className='text-yellow-600 cursor-pointer'
        onClick={(e) => {
          e.stopPropagation();
          setEditingId(todo.id);
          setEditedTitle(todo.title);
        }}
      />
    </div>
  </>
)}


            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
