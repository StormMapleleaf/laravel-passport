import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 导入主应用组件 App
import './index.css'; // 导入全局样式（如果有的话）
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />  {/* 渲染 App 组件 */}
  </React.StrictMode>
);