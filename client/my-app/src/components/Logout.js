import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '8px',
        color: '#fff',
      }}>
        <h2>You have been logged out</h2>
        <p>Thank you for using our application!</p>
        <button onClick={handleLoginRedirect} style={{
          padding: '10px',
          backgroundColor: '#2196f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}>Go to Login</button>
      </div>
    </div>
  );
};

export default Logout;
