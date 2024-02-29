import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const OTPVerify = ({data}) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        data.otp = values.otp;
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup/verifyotp', data);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                message.success('OTP verification successful!');
                // Handle success scenario here, such as redirecting the user
            } else {
                message.error('OTP verification failed. Please try again.');
                // Handle failure scenario here, such as displaying an error message to the user
            }
        } catch (error) {
            // console.error('Error:', error);
            message.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Form
                name="otp_verify"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: '400px' }}
            >
                <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>OTP Verification</Title>
                
                <Form.Item
                    name="otp"
                    label="Enter OTP"
                    rules={[
                        { required: true, message: 'Please enter the OTP!' },
                        { pattern: /^\d{4}$/, message: 'OTP must be a 4-digit number!' },
                    ]}
                >
                    <Input placeholder="Enter OTP" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Verify OTP
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default OTPVerify;
