import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Spin, Alert } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = () => {
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

        fetchUserData();
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
