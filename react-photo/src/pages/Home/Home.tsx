// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';

const Home: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userJson = localStorage.getItem('user');
            // const token = localStorage.getItem('token');
            console.log('userJson', userJson);
            if (!userJson ) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            const user = JSON.parse(userJson);
            const userId = user;

            try {
                const response = await axios.post('/api/user', {
                    user_id: userId
                });
                setUserData(response.data);
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            {userData ? (
                <>
                    <h1>{userData.username}</h1>
                    <p>Email: {userData.email}</p>
                    <div>
                        <h2>Photos:</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {userData.photos.length > 0 ? (
                                userData.photos.map((photoUrl: string, index: number) => (
                                    <img
                                        key={index}
                                        src={photoUrl}
                                        alt={`User Photo ${index}`}
                                        style={{ width: '200px', height: 'auto', margin: '10px' }}
                                    />
                                ))
                            ) : (
                                <p>No photos available.</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Home;
