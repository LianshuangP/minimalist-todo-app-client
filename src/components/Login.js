import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate user input
      if (!formData.username || !formData.password) {
        alert('Please enter both username and password');
        return;
      }

      // Simulate a login request to the server
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login successful, you can redirect to the desired page or perform other actions
        // Redirecting to a dashboard page for this example
        window.location.href = '/dashboard';
        console.log('Login successful');
      } else {
        // Login failed, display an error message
        alert('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Login request failed:', error);
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
