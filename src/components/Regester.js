import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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

      // Simulate a registration request to the server
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, you can redirect to the login page or perform other actions
        // Redirecting to the login page for this example
        window.location.href = '/login';
        console.log('User registered successfully');
      } else {
        // Registration failed, display an error message
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('User registration failed:', error);
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
        <h2>Register</h2>
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
            Register
          </button>
        </form>
        <p className="text-center mt-5">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
