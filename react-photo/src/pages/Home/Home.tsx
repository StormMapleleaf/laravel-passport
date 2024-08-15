import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Spin, Alert } from 'antd';
import axios from 'axios';
import Password from 'antd/es/input/Password';

const { Title, Paragraph } = Typography;

const Home = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userJson = localStorage.getItem('user');

            if (!userJson) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            try {
                const user = JSON.parse(userJson);
                setUserData(user);
            } catch (err) {
                setError('Failed to parse user data');
            } finally {
                setLoading(false);
            }
        };

        const handleAuthorizationCode = async (code: string) => {
            try {
                const response = await axios.post('http://localhost:8080/oauth/token', {
                    grant_type: 'authorization_code',
                    client_id: '48421d47-8e20-4cbb-a487-24bdcfb2081d',
                    client_secret: 'vnKnf9TXSWiT0t8Co9BXWgbX3DtmgdvGKk9Hz748',
                    redirect_uri: 'http://localhost:3000/home',
                    code: code,
                });

                const { access_token } = response.data;
        
                // Assuming your backend has an endpoint to fetch user data using the access token
                const userResponse = await axios.get('http://localhost:8080/api/user', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                const user = userResponse.data;
                localStorage.setItem('user', JSON.stringify(user));
                setUserData(user);
                // console.log('User data:', user);
                const register = await axios.post('http://localhost:8082/api/register', {
                    // id: user.id,
                    name: user.name,
                    email: user.email,
                    password: 'test',
                });
            } catch (err) {
                console.log('Error:', err);
                
            } finally {
                setLoading(false);
            }
        };

        // Check if there is a "code" in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            handleAuthorizationCode(code);
        } else {
            fetchUserData();
        }
    }, []);

    // Handle loading, error, and user data display
    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;
    if (!userData) return <Alert message="No User Data" description="No user data available" type="warning" showIcon />;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: 24 }}>
            <Card style={{ width: 300, textAlign: 'center' }}>
                <Title level={4}>用户信息</Title>
                <Paragraph><strong>ID:</strong> {userData.id}</Paragraph>
                <Paragraph><strong>用户名:</strong> {userData.name}</Paragraph>
                <Paragraph><strong>邮箱:</strong> {userData.email}</Paragraph>
                <Button type="primary" onClick={() => navigate('/photo')} style={{ marginTop: 16 }}>
                    我的相册
                </Button>
            </Card>
        </div>
    );
};

export default Home;
