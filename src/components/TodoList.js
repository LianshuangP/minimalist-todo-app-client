import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos);
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      return;
    }

    try {
      const response = await fetch('/api/todo/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: newTodo }),
      });

      if (response.ok) {
        const newTodoItem = await response.json();
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
      } else {
        console.error('Failed to add todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`/api/todo/delete/${todoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== todoId));
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand mb-0 h1" href="/">
            Minimalist Todo App
          </a>
        </nav>
      </header>

      <div className="container mt-5">
        <h2>Todo List</h2>
        <form className="d-flex">
          <input
            type="text"
            name="todo"
            className="form-control"
            placeholder="Say something here..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <input
            type="button"
            value="Add todo"
            className="btn btn-md btn-primary mx-2"
            onClick={addTodo}
          />
        </form>

        <ul className="list-group my-5">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div className="d-flex align-items-center" key={todo._id}>
                <li className="list-group-item">{todo.todo}</li>
                <button
                  type="button"
                  className="btn btn-danger btn-md ml-1"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No todos available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
