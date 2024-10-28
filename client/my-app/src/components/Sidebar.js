import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ open }) => {
  const location = useLocation();
  const menuItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'Tables', path: '/settings' },
    { text: 'Sign In', path: '/login' },
    { text: 'Sign Out', path: '/logout' },
  ];

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#1a202c',
      color: '#fff',
      position: 'fixed',
      left: open ? '0' : '-250px',
      transition: 'left 0.3s',
      paddingTop: '20px',
    }}>
      <h2 style={{ textAlign: 'center', margin: '0', paddingBottom: '20px' }}>Menu</h2>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {menuItems.map((item, index) => (
          <li key={index} style={{ padding: '10px 20px', backgroundColor: location.pathname === item.path ? '#2c374d' : 'transparent' }}>
            <Link to={item.path} style={{ color: '#fff', textDecoration: 'none' }}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
