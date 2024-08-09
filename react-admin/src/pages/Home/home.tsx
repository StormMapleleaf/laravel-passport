import React, { useEffect, useState } from 'react';
import './Home.css';
import api from '../../api/api'; 

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
    const [newClient, setNewClient] = useState({
        name: '',
        redirect: '',
    });

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
            setShowForm(false); // 关闭表单
            setNewClient({ name: '', redirect: '' }); // 清空表单
        } catch (err) {
            setError('添加客户端失败');
        }
    };

    const handleDeleteClient = async (id: string) => {
        try {
            await api.post('/client/delete', {
                id: [id]  // 以数组形式发送 ID
            });
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <div className="navigation-buttons">
                <button className="nav-button" onClick={() => window.location.href = '/apply'}>申请列表</button>
                <button className="nav-button" onClick={() => window.location.href = '/user'}>用户管理</button>
            </div>

            <h1>客户端列表</h1>
            <div className="buttons">
                <button className="button" onClick={() => setShowForm(true)}>添加客户端</button>
            </div>

            {showForm && (
                <div className="form-container">
                    <h2>添加客户端</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddClient();
                    }}>
                        <div className="form-group">
                            <label htmlFor="name">名称</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newClient.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="redirect">重定向 URL</label>
                            <input
                                type="url"
                                id="redirect"
                                name="redirect"
                                value={newClient.redirect}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="button">提交</button>
                        <button
                            type="button"
                            className="button cancel"
                            onClick={() => {
                                setShowForm(false);
                                setNewClient({ name: '', redirect: '' });
                            }}
                        >
                            取消
                        </button>
                    </form>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>客户端</th>
                        <th>重定向地址</th>
                        <th>Personal Access Client</th>
                        <th>Password Client</th>
                        <th>Revoked</th>
                        <th>创建时间</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.redirect}</td>
                            <td>{client.personal_access_client ? 'Yes' : 'No'}</td>
                            <td>{client.password_client ? 'Yes' : 'No'}</td>
                            <td>{client.revoked ? 'Yes' : 'No'}</td>
                            <td>{new Date(client.created_at).toLocaleString()}</td>
                            <td>{new Date(client.updated_at).toLocaleString()}</td>
                            <td>
                                <button className="button delete" onClick={() => handleDeleteClient(client.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
