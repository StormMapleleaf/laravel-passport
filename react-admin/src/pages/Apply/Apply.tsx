import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Select, Typography, Spin, Alert } from 'antd';
import { ColumnsType } from 'antd/es/table';
import './Apply.css';

const { Title } = Typography;
const { Option } = Select;

interface ClientApplication {
    id: number;
    applicant: string;
    phone_number: string;
    client_name: string;
    callback_url: string;
    status: number;
    created_at: string;
}

const Apply: React.FC = () => {
    const [applications, setApplications] = useState<ClientApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:8080/api/applylist')
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                setError('Error fetching data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (id: number, newStatus: number) => {
        axios.post('http://localhost:8080/api/applyupdate', {
            id: id,
            status: newStatus
        })
        .then(() => {
            setApplications(prevApplications =>
                prevApplications.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                )
            );
        })
        .catch(error => {
            setError('Error updating status');
        });
    };

    const columns: ColumnsType<ClientApplication> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: '申请人', dataIndex: 'applicant', key: 'applicant' },
        { title: '电话号码', dataIndex: 'phone_number', key: 'phone_number' },
        { title: '客户端名称', dataIndex: 'client_name', key: 'client_name' },
        { 
            title: '回调地址', 
            dataIndex: 'callback_url', 
            key: 'callback_url',
            render: (text: string) => (
                <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
            )
        },
        { 
            title: '申请时间', 
            dataIndex: 'created_at', 
            key: 'created_at',
            render: (text: string) => new Date(text).toLocaleString()
        },
        { 
            title: '状态', 
            dataIndex: 'status', 
            key: 'status',
            render: (status: number, record: ClientApplication) => (
                <Select
                    value={status}
                    onChange={(value) => handleStatusChange(record.id, value)}
                    style={{ width: 120 }}
                >
                    <Option value={1}>待审批</Option>
                    <Option value={2}>已通过</Option>
                    <Option value={3}>未通过</Option>
                </Select>
            )
        },
    ];

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message={error} type="error" showIcon />;

    return (
        <div style={{ padding: 20 }}>
            <Title level={1}>申请列表</Title>
            <Button type="primary" onClick={() => navigate('/home')} style={{ marginBottom: 20 }}>
                回到首页
            </Button>
            <Table 
                columns={columns} 
                dataSource={applications} 
                rowKey="id" 
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default Apply;
