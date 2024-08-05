// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import LoginP from './pages/LoginP';
import Welcome from './pages/welcome';
import Callback from './pages/Callback';
import Hello from './components/Hello';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loginp" element={<LoginP />} />
                <Route path="/callback" element={<Callback/>} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </Router>
    );
};

export default App;
