import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { FormInstance } from 'antd/es/form';

interface FormData {
  applicant: string;
  phone_number: string;
  client_name: string;
  callback_url: string;
  status: string;
}

const Apply: React.FC = () => {
  const [form] = Form.useForm<FormInstance>();
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleSubmit = async (values: FormData) => {
    try {
      const response = await fetch('http://localhost:8080/api/applycreate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        redirect: 'manual', // 禁用自动重定向
      });

      if (response.type === 'opaqueredirect') {
        setSubmitStatus('请求被重定向，请检查服务器配置。');
      } else if (response.ok) {
        setSubmitStatus('申请提交成功！');
        form.resetFields(); // 清空表单
      } else {
        setSubmitStatus('申请提交失败。');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('提交申请时发生错误。');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Form
        // form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: '1' }} // 设置默认值为 1
      >
        <Form.Item
          label="申请人"
          name="applicant"
          rules={[{ required: true, message: '申请人是必填项' }]}
        >
          <Input placeholder="请输入申请人姓名" />
        </Form.Item>
        
        <Form.Item
          label="电话号码"
          name="phone_number"
          rules={[{ required: true, message: '电话号码是必填项' }]}
        >
          <Input placeholder="请输入电话号码" />
        </Form.Item>

        <Form.Item
          label="客户端名称"
          name="client_name"
          rules={[{ required: true, message: '客户端名称是必填项' }]}
        >
          <Input placeholder="请输入客户端名称" />
        </Form.Item>

        <Form.Item
          label="回调 URL"
          name="callback_url"
          rules={[{ required: true, message: '回调 URL 是必填项' }]}
        >
          <Input placeholder="请输入回调 URL" />
        </Form.Item>

        <Form.Item
          name="status"
          initialValue="1"
        >
          <Input type="hidden" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">提交申请</Button>
        </Form.Item>

        {submitStatus && <Alert message={submitStatus} type={submitStatus.includes('成功') ? 'success' : 'error'} showIcon />}
      </Form>
    </div>
  );
};

export default Apply;
