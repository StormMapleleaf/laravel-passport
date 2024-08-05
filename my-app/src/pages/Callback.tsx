import React, { useEffect } from 'react';
import axios from 'axios';
const Callback: React.FC = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            const performTokenRequest = async () => {
                const clientId = '9caec06c-82b0-47c8-8c04-6937f3201870'; // 客户端 ID
                const clientSecret = 'Sm5VyeYiql4oga3Os2W9pFAYZN7qKatL2ge7fLp3'; // 客户端密钥
                const redirectUri = 'http://localhost:3000/welcome';
                try {
                    const response = await axios.post('http://localhost:8080/api/oauth/token', {
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: redirectUri,
                        client_id: clientId,
                        client_secret: clientSecret,
                    });
                    const { access_token } = response.data;
                    localStorage.setItem('token', access_token); // 存储 token
                    console.log('登录成功', access_token);
                    // 重定向到应用主页面
                    window.location.href = '/';
                } catch (error) {
                    console.error('获取 token 失败', error);
                }
            };
            performTokenRequest();
        }
    }, []);
    return <div>正在登录...</div>;
};

export default Callback;