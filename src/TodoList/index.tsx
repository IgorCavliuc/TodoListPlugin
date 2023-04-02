import './index.css'
import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import TodoItem from "../TodoItem/index.tsx";

const TodoList = () => {
const storage= localStorage.getItem('todos')
    const [todos, setTodos] = useState(JSON.parse(storage));
    const [newTodo, setNewTodo] = useState('');
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);

    useEffect(() => {
        const canUseLocalStorage = localStorage !== null && localStorage !== undefined;
        if (canUseLocalStorage) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { id: uuid(), title: newTodo.trim() }]);
            setNewTodo('');
        }
    };

    const editTodo = (id, title) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, title } : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };


    return(
      <div className='todo-list--ui'>
          <p>Todo-List for your planning</p>

          <div className='todo-list--ui__add-panel'>

              <input  type="text"
                      placeholder="Enter a new to-do item"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}/>
              <button onClick={addTodo}>Add</button>
          </div>

          {todos.map((item)=>{
              return (
                  <div key={item.id}>

<TodoItem title={item.title}
          id={item.id}
          changeUpdate={ (value) => {
    editTodo(item.id, value.trim())
}}

changeDelete={() => deleteTodo(item.id)}/>
                  </div>
              )
          })}

      </div>
  )
};

export default TodoList;
