// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios.post('http://localhost:3000/api/login', credentials)
      .then(res => {
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/user');
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.error || 'Login failed');
      });
  };

  return (
    <div className="mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default Login;