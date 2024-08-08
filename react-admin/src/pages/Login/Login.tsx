// src/pages/Login.tsx
import React, { useState } from 'react';
import api from '../../api/api'; 
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // 导入样式文件

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/user/login', {
                email,
                password,
            });
             const token = response.data.token;
             localStorage.setItem('token', token);
             
            setMessage('登录成功');
            navigate('/home'); // 跳转到主页或其他你想跳转的页面

        } catch (error) {
            setMessage('登录失败');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <h2>登录</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>邮箱:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>密码:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit">登录</button>
                    </div>
                </form>
                {message && <p className={styles.message}>{message}</p>}
                <div className={styles.formGroup}>
                <a href="http://localhost:8080/oauth/authorize?client_id=9cb0c3b1-b5f3-475a-8a0b-17934bee2d99&redirect_uri=http://localhost:3000/home&response_type=code&scope=*">
                    第三方登录
                </a>
            </div>
            </div>
        </div>
    );
};

export default Login;
