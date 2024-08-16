import React from 'react';
import { Button } from 'antd';

const AuthButton = () => {
    const handleAuth = () => {
        const clientId = '9cc54706-9344-4f1f-ab55-eb4fc0771fa8';
        const redirectUri = 'http://localhost:8000/welcome';
        const responseType = 'code';
        const scope = '*';
        const authUrl = `http://localhost:8080/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;

        window.location.href = authUrl;
    };

    return (
        <Button type="primary" onClick={handleAuth}>
            第三方登录
        </Button>
    );
};

export default AuthButton;
