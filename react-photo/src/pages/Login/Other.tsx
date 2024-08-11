import React from 'react';

const AuthButton = () => {
    const handleAuth = () => {
        const clientId = 'ad46c0d9-77f4-43f4-969c-7f640b990698';
        const redirectUri = 'http://localhost:3000/home';
        const responseType = 'code';
        const scope = '*';
        const authUrl = `http://localhost:8080/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;

        window.location.href = authUrl;
    };

    return <button onClick={handleAuth}>第三方登录</button>;
};

export default AuthButton;
