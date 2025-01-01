// src/components/LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSuccess();
        onClose();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login to Planted</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            placeholder="Email"
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            placeholder="Password"
            required
            className="input"
          />
          <div>
            <button type="button" onClick={onClose} className="close-button">
              Cancel
            </button>
            <button type="submit" className="button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;