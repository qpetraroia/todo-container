import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos').then(response => setTodos(response.data));
  }, []);

  const addTodo = () => {
    const todo = { id: Date.now(), text: newTodo };
    axios.post('http://localhost:5000/todos', todo).then(response => {
      setTodos([...todos, response.data]);
      setNewTodo('');
    });
  };

  const deleteTodo = id => {
    axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
