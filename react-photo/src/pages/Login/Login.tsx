import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Layout, Typography, Card } from 'antd';
import api from '../../api/api'; 

const { Title } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('error');
    const navigate = useNavigate();

    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            const response = await api.post('/api/login', {
                email: values.email,
                password: values.password,
            });

            console.log('Login response:', response.data); // 调试信息

            // 解构获取 token 和 user
            const user = response.data;

            if (user) {
                localStorage.setItem('user', JSON.stringify(user)); // 保存用户信息

                console.log('Saved user:', user); // 调试信息

                setMessage('登录成功');
                setMessageType('success');
                navigate('/home'); // 跳转到主页或其他页面
            } else {
                setMessage('用户信息缺失');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Login error:', error); // 记录详细错误
            setMessage('登录失败');
            setMessageType('error');
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card style={{ width: 400, padding: '20px' }}>
                    <Title level={2} style={{ textAlign: 'center' }}>登录</Title>
                    <Form
                        name="login"
                        onFinish={handleSubmit}
                        layout="vertical"
                        initialValues={{ email, password }}
                    >
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[{ required: true, message: '请输入你的邮箱!' }]}
                        >
                            <Input 
                                type="email" 
                                placeholder="请输入邮箱"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入你的密码!' }]}
                        >
                            <Input.Password 
                                placeholder="请输入密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    {message && (
                        <Form.Item>
                            <Alert message={message} type={messageType} showIcon />
                        </Form.Item>
                    )}
                    <Form.Item style={{ textAlign: 'center' }}>
                        <a href="http://localhost:8080/oauth/authorize?client_id=4fb6f2ab-0861-4c5b-a3bc-06b482197276&redirect_uri=http://localhost:3000/home&response_type=code&scope=*">
                            第三方登录
                        </a>
                    </Form.Item>
                </Card>
            </Content>
        </Layout>
    );
};

export default Login;
