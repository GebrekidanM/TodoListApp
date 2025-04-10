import React from 'react';
import TodoList from './component/TodoList';
import CreateTodo from './component/CreateTodo';
import Header from './component/Header';

function App() {
  
  return (
    <div className="flex flex-col">
      <Header/>
      <div className="flex p-10 justify-center flex-wrap ">
        <TodoList/>
        <CreateTodo/>
      </div>
      
    </div>
  );
}

export default App;
