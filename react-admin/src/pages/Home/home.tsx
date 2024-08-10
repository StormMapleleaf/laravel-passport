import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Table, Typography, Spin, Alert } from 'antd';
import api from '../../api/api';

const { Title } = Typography;

interface Client {
    id: string;
    user_id: string | null;
    name: string;
    provider: string | null;
    redirect: string;
    personal_access_client: boolean;
    password_client: boolean;
    revoked: boolean;
    created_at: string;
    updated_at: string;
}

const Home: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showForm, setShowForm] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', redirect: '' });

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.post('/client/list');
                setClients(response.data.data);
            } catch (err) {
                setError('Failed to fetch clients');
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const handleAddClient = async () => {
        try {
            const response = await api.post('/client/create', {
                name: newClient.name,
                redirect: newClient.redirect,
            });
            setClients([...clients, response.data]);
            setShowForm(false);
            setNewClient({ name: '', redirect: '' });
        } catch (err) {
            setError('添加客户端失败');
        }
    };

    const handleDeleteClient = async (id: string) => {
        try {
            await api.post('/client/delete', { id: [id] });
            setClients(clients.filter(client => client.id !== id));
        } catch (err) {
            setError('Failed to delete client');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewClient(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: '客户端', dataIndex: 'name', key: 'name' },
        { title: '重定向地址', dataIndex: 'redirect', key: 'redirect' },
        { title: 'Personal Access Client', dataIndex: 'personal_access_client', key: 'personal_access_client', render: (text: boolean) => (text ? 'Yes' : 'No') },
        { title: 'Password Client', dataIndex: 'password_client', key: 'password_client', render: (text: boolean) => (text ? 'Yes' : 'No') },
        { title: 'Revoked', dataIndex: 'revoked', key: 'revoked', render: (text: boolean) => (text ? 'Yes' : 'No') },
        { title: '创建时间', dataIndex: 'created_at', key: 'created_at', render: (text: string) => new Date(text).toLocaleString() },
        { title: '更新时间', dataIndex: 'updated_at', key: 'updated_at', render: (text: string) => new Date(text).toLocaleString() },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: Client) => (
                <Button type="link" danger onClick={() => handleDeleteClient(record.id)}>
                    删除
                </Button>
            ),
        },
    ];

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message={error} type="error" showIcon />;

    return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
                <Button type="primary" onClick={() => window.location.href = '/apply'} style={{ marginRight: 10 }}>申请列表</Button>
                <Button type="primary" onClick={() => window.location.href = '/user'}>用户管理</Button>
            </div>

            <Title level={1}>客户端列表</Title>
            <Button type="primary" onClick={() => setShowForm(true)} style={{ marginBottom: 20 }}>添加客户端</Button>

            <Table columns={columns} dataSource={clients} rowKey="id" />

            <Modal
                title="添加客户端"
                visible={showForm}
                onOk={handleAddClient}
                onCancel={() => setShowForm(false)}
                okText="提交"
                cancelText="取消"
            >
                <Form layout="vertical" onFinish={handleAddClient}>
                    <Form.Item
                        label="名称"
                        name="name"
                        rules={[{ required: true, message: '请输入客户端名称!' }]}
                    >
                        <Input
                            value={newClient.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                    </Form.Item>
                    <Form.Item
                        label="重定向 URL"
                        name="redirect"
                        rules={[{ required: true, message: '请输入重定向 URL!' }]}
                    >
                        <Input
                            type="url"
                            value={newClient.redirect}
                            onChange={handleInputChange}
                            name="redirect"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Home;
