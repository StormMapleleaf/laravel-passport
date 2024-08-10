import React from 'react';

const AuthButton = () => {
    const handleAuth = () => {
        const clientId = '4fb6f2ab-0861-4c5b-a3bc-06b482197276';
        const redirectUri = 'http://localhost:3000/home';
        const responseType = 'code';
        const scope = '*';
        const authUrl = `http://localhost:8080/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;

        window.location.href = authUrl;
    };

    return <button onClick={handleAuth}>第三方登录</button>;
};

export default AuthButton;
