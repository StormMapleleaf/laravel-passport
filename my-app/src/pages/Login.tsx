import React, { useState } from 'react';
import axios from 'axios';
import api from '../api/api'; 
import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await api.post('/login', {
//                 email,
//                 password,
//             });
//              const token = response.data.token;
//         localStorage.setItem('token', token);
//             setMessage('登录成功');
//             navigate('/welcome'); // 跳转到主页或其他你想跳转的页面

//         } catch (error) {
//             setMessage('登录失败');
//         }
//     };

//     return (
//         <div>
//             <h2>登录</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>邮箱:</label>
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>密码:</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 </div>
//                 <button type="submit">登录</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

const Login: React.FC = () => {
    const handleLogin = () => {
        const redirectUri = encodeURIComponent('http://localhost:3000/welcome');
        const clientId = '9caec06c-82b0-47c8-8c04-6937f3201870'; // 使用上面创建的客户端 ID
        // const token = 'CDdBVHqVTkblrgbdy7V7tQFFKeySDo9ykJcRShnHViDVWumWeoFZ2XIGSEaL';
        const authUrl = `http://localhost:8080/api/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
        window.location.href = authUrl; // 重定向到 Laravel 授权
    };
    return (
        <div>
            <h1>OAuth 登录</h1>
            <button onClick={handleLogin}>登录</button>
        </div>
    );
};

export default Login;
