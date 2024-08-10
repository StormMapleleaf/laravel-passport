import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, Alert, Layout, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Ant Design Spin loading icon
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Header, Content } = Layout;
const { Title } = Typography;

const Photo: React.FC = () => {
    const [photos, setPhotos] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const userId = userJson ? JSON.parse(userJson).id : null;
        const userName = userJson ? JSON.parse(userJson).name : null;

        if (userName) {
            setUsername(userName);
        } else {
            setUsername('用户');
        }

        const fetchPhotos = async () => {
            try {
                const response = await axios.post('http://localhost:8082/api/photos', {
                    user_id: userId
                });
                setPhotos(response.data);
            } catch (err) {
                setError('Failed to fetch photos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    const usernameDisplay = username || '用户';

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#1890ff', padding: '0 20px' }}>
                <Title level={2} style={{ color: '#fff', margin: 0 }}>
                    {usernameDisplay} 的相册
                </Title>
            </Header>
            <Content style={{ padding: '20px', background: '#f0f2f5' }}>
                {loading && <Spin indicator={antIcon} />}
                {error && <Alert message={error} type="error" />}
                <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '16px', 
                    justifyContent: 'center' 
                }}>
                    {photos.map((photo: any) => (
                        <Card
                            key={photo.id}
                            cover={<img alt={photo.title} src={photo.url} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />}
                            style={{ width: 240, borderRadius: '8px' }}
                        >
                            <Card.Meta 
                                title={photo.title} 
                                style={{ 
                                    textAlign: 'left', 
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis' 
                                }} 
                            />
                        </Card>
                    ))}
                </div>
            </Content>
        </Layout>
    );
};

export default Photo;
