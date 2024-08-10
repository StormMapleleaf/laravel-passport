import React, { useState } from 'react';

interface FormData {
  applicant: string;
  phone_number: string;
  client_name: string;
  callback_url: string;
  status: string;
}

const Apply: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    applicant: '',
    phone_number: '',
    client_name: '',
    callback_url: '',
    status: '1', // 设置默认值为 1
  });

  const [errors, setErrors] = useState({
    applicant: '',
    phone_number: '',
    client_name: '',
    callback_url: '',
  });

  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.applicant) {
      newErrors.applicant = '申请人是必填项';
    }
    if (!formData.phone_number) {
      newErrors.phone_number = '电话号码是必填项';
    }
    if (!formData.client_name) {
      newErrors.client_name = '客户端名称是必填项';
    }
    if (!formData.callback_url) {
      newErrors.callback_url = '回调 URL 是必填项';
    }

    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/api/applycreate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          redirect: 'manual', // 禁用自动重定向
        });

        if (response.type === 'opaqueredirect') {
          setSubmitStatus('请求被重定向，请检查服务器配置。');
        } else if (response.ok) {
          setSubmitStatus('申请提交成功！');
        } else {
          setSubmitStatus('申请提交失败。');
        }
      } catch (error) {
        console.error('Error:', error);
        setSubmitStatus('提交申请时发生错误。');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          申请人:
          <input
            type="text"
            name="applicant"
            value={formData.applicant}
            onChange={handleChange}
          />
          {errors.applicant && <span className="error">{errors.applicant}</span>}
        </label>
      </div>
      <div>
        <label>
          电话号码:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && <span className="error">{errors.phone_number}</span>}
        </label>
      </div>
      <div>
        <label>
          客户端名称:
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
          />
          {errors.client_name && <span className="error">{errors.client_name}</span>}
        </label>
      </div>
      <div>
        <label>
          回调 URL:
          <input
            type="text"
            name="callback_url"
            value={formData.callback_url}
            onChange={handleChange}
          />
          {errors.callback_url && (
            <span className="error">{errors.callback_url}</span>
          )}
        </label>
      </div>
      <button type="submit">提交申请</button>
      {submitStatus && <p>{submitStatus}</p>}
    </form>
  );
};

export default Apply;
