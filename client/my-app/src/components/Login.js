import React, { useState } from 'react';
import { loginUser } from '../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log(response.data);
      window.location.href = '/';
    } catch (error) {
      alert('Invalid credentials!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <h2>Sign In</h2>
        <label>Email Address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
        
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ display: 'block', marginBottom: '20px', padding: '8px', width: '100%' }} />
        
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#2196f3', color: '#fff', border: 'none', borderRadius: '4px' }}>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
