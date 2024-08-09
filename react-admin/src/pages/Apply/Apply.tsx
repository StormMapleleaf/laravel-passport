import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Apply.css';

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
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    useEffect(() => {
        // Replace with your API endpoint
        axios.post('http://localhost:8080/api/applylist')
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleStatusChange = (id: number, newStatus: number) => {
        axios.post('http://localhost:8080/api/applyupdate', {
            id: id,
            status: newStatus
        })
        .then(response => {
            setApplications(prevApplications =>
                prevApplications.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                )
            );
        })
        .catch(error => {
            console.error('Error updating status:', error);
        });
    };

    return (
        <div className="container">
            <h1>申请列表</h1>
            <div className="buttons">
                <button className="button" onClick={() => navigate('/home')}>回到首页</button>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>申请人</th>
                    <th>电话号码</th>
                    <th>客户端名称</th>
                    <th>回调地址</th>
                    <th>申请时间</th>
                    <th>状态</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(application => (
                        <tr key={application.id}>
                            <td>{application.id}</td>
                            <td>{application.applicant}</td>
                            <td>{application.phone_number}</td>
                            <td>{application.client_name}</td>
                            <td><a href={application.callback_url} target="_blank" rel="noopener noreferrer">{application.callback_url}</a></td>

                            <td>{new Date(application.created_at).toLocaleString()}</td>
                            <td>
                            <div className="form-group">
                                <select
                                    id="status"
                                    value={application.status}
                                    onChange={(e) => handleStatusChange(application.id, parseInt(e.target.value))}
                                    className="status-select"
                                >
                                    <option value={1}>待审批</option>
                                    <option value={2}>已通过</option>
                                    <option value={3}>未通过</option>
                                </select>
                            </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Apply;
