// src/components/LoginForm.js
import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const styles = {
    form: {
      maxWidth: '400px',
      margin: '40px auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    title: {
      color: '#2c7a2c',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1rem',
      border: '1px solid #ddd',
      borderRadius: '5px'
    },
    button: {
      backgroundColor: '#2c7a2c',
      color: 'white',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      width: '100%'
    }
  };

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
        // Add navigation logic here
        console.log('Login successful');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={styles.form}>
      <h2 style={styles.title}>Login to Planted</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;