import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    height: '',
    weight: '',
    allergies: '',
    disability: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios.post('http://localhost:3000/api/signup', formData)
      .then(res => {
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/user');
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.error || 'Signup failed');
      });
  };

  return (
    <div className="mt-5">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Height (cm)</label>
          <input type="number" name="height" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Weight (kg)</label>
          <input type="number" name="weight" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Allergies</label>
          <input type="text" name="allergies" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Disability</label>
          <input type="text" name="disability" className="form-control" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Signup;