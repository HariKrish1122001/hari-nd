import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashbord';
import Settings from './components/LicenseTable'; 
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Logout from './components/Logout';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleMenuClick = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    return (
        <Router>
            <Box>
                {!sidebarOpen && <Navbar onMenuClick={handleMenuClick} />}
                <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
                <Box
                    sx={{
                        transition: 'margin 0.3s',
                        marginLeft: sidebarOpen ? '250px' : '0',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
