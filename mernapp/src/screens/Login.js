import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // New CSS file just for login styling

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert('Invalid credentials');
    }
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('authToken', json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  return (
    <div className="login-page">
  <div className="login-box">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={credentials.email}
          onChange={onChange}
          id="email"
        />
        <div className="form-text">We'll never share your email.</div>
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
      <div className="button-group">
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/createuser" className="btn btn-outline-light">Sign up</Link>
      </div>
    </form>
  </div>
</div>

  );
}
