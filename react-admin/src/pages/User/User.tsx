import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Spin, Typography, Alert } from 'antd';
import api from '../../api/api'; // 确保 api 配置正确

const { Title } = Typography;

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

const User: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.post('/user/list'); // 确保 API 路径正确
                setUsers(response.data.data);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '电子邮件',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text: string) => new Date(text).toLocaleString(),
        },
        {
            title: '更新时间',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text: string) => new Date(text).toLocaleString(),
        },
    ];

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message={error} type="error" showIcon />;

    return (
        <div style={{ padding: 20 }}>
            <Title level={1}>用户列表</Title>
            <div style={{ marginBottom: 20 }}>
                <Button type="primary" onClick={() => navigate('/home')}>回到首页</Button>
            </div>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default User;
