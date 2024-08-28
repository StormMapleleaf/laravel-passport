import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, List, Button } from 'antd';

interface NewsItem {
    id: number;
    title: string;
    created_at: string;
}

const NewsList = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5); // 每页显示5条
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchNewsFromRedis();
    }, []);

    const fetchNewsFromRedis = async () => {
        try {
            const response = await axios.post('http://localhost:80/api/newsshow');
            if (response.data) {
                setNews(response.data);
                setTotal(response.data.length); // 设置总条目数
            }
        } catch (error) {
            console.error("Error fetching news from Redis:", error);
        }
    };

    const onChange = (page: number) => {
        setCurrentPage(page);
    };

    // 计算当前页的新闻数据
    const currentNews = news.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={currentNews}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            title={item.title}
                            description={new Date(item.created_at).toLocaleDateString()}
                        />
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={onChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />
            {currentPage === 4 && (
                <Button
                    type="primary"
                    style={{ marginTop: '20px' }}
                    
                >
                    查看更多
                </Button>
            )}
        </div>
    );
};

export default NewsList;
