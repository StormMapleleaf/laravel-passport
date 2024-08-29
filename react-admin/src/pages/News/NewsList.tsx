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
    const [latestNewsId, setLatestNewsId] = useState<number>(0); // 初始化为0

    useEffect(() => {
        fetchNews(currentPage); // 初始化时加载第一页数据
    }, [currentPage]);

    const fetchNews = async (page: number) => {
        try {
            const response = await axios.get(`http://localhost:80/api/newslist?page=${page}&latest=${latestNewsId}`);
            if (response.data) {
                setNews(response.data.news);
                setTotal(response.data.totalPages * pageSize); // 根据总页数和每页数量计算总条目数
                if (!latestNewsId) {
                    setLatestNewsId(response.data.latestNewsId); // 保存初始的 latestNewsId
                }
            }
        } catch (error) {
            console.error("Error fetching news from server:", error);
        }
    };

    const onChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={news}
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
