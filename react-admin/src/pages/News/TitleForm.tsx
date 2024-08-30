import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const TitleForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // 发送 POST 请求
    axios.post('http://localhost:80/api/messageapply2', values)
      .then((response) => {
        // 请求成功后的处理
        message.success('Title submitted successfully');
        form.resetFields();
      })
      .catch((error) => {
        // 请求失败后的处理
        message.error('Submission failed');
        console.error(error);
      });
  };

  return (
    <Form
      form={form}
      name="titleForm"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '新闻标题' }]}
      >
        <Input placeholder="输入标题" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TitleForm;
