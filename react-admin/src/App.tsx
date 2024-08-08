// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/home';
import Welcome from './pages/welcome';

import Hello from './components/Hello';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
