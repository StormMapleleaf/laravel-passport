import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // 确保 api 配置正确

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
    const navigate = useNavigate(); // 使用 useNavigate 钩子

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h1>用户列表</h1>
            <div className="buttons">
                <button className="button" onClick={() => navigate('/home')}>回到首页</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名称</th>
                        <th>电子邮件</th>
                        <th>创建时间</th>
                        <th>更新时间</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.created_at).toLocaleString()}</td>
                            <td>{new Date(user.updated_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
