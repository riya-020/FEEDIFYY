import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Reusing your modern styles from Login

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: ''
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    console.log(json);
    if(!json.success) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="email"
              aria-describedby="emailHelp"
            />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.address}
              onChange={onChange}
              id="address"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/login" className="btn btn-outline-light">Already a user? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
