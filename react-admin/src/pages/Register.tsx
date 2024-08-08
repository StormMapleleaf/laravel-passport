// src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import api from '../api/api'; 

const Register: React.FC = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/signup', {
                username,
                email,
                password,
                // password_confirmation: passwordConfirmation,
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error registering:', error);
            setMessage('Registration failed');
        }
    };

    return (
        <div>
            <h2>注册</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>用户名:</label>
                    <input type="text" value={username} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>邮箱:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>密码:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {/* <div>
                    <label>确认密码:</label>
                    <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
                </div> */}
                <button type="submit">注册</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
