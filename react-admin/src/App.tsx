// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/home';
// import Apply from './pages/Apply/Apply';
import User from './pages/User/User';
import Apply from './pages/Apply/Apply';
import NewsApply from './pages/News/TitleForm';


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/user" element={<User />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/newsapply" element={<NewsApply />} />
            </Routes>
        </Router>
    );
};

export default App;
