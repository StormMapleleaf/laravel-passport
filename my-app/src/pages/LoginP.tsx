import React, { useState } from 'react';
import axios from 'axios';
import api from '../api/api'; 
import { useNavigate } from 'react-router-dom';

const LoginP: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/login', {
                email,
                password,
            });
             const token = response.data.token;
             localStorage.setItem('token', token);
             
            setMessage('登录成功');
            navigate('/login'); // 跳转到主页或其他你想跳转的页面

        } catch (error) {
            setMessage('登录失败');
        }
    };

    return (
        <div>
            <h2>登录</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>邮箱:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>密码:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">登录</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};



export default LoginP;
