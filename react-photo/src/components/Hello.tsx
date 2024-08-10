// src/components/Hello.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/api'; // 确保引入 api
const Hello: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchHello = async () => {
      try {
        const response = await api.get('/hello'); // 使用相对路径
        setMessage(response.data.message);
      } catch (err) {
        console.error('Error fetching hello:', err);
        setError('Failed to fetch hello message');
      }
    };
    fetchHello();
  }, []);
  if (error) {
    return <div>{error}</div>;
  }
  return <div>{message}</div>;
};
export default Hello;