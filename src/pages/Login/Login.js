import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import OTPVerify from '../OTPVerfiy/OTPVefiy';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState('');
    const [showOTPVerify, setShowOTPVerify] = useState(false); // State to control OTPVerify component visibility

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login/requestotp', values);

            if (response.status === 200) {
              setUserData(response.data);
              setShowOTPVerify(true); // Show OTPVerify component when OTP is successfully sent
              console.log(response.data);
                message.success(response.data.sendOtp);
                // Here you can handle OTP sent successfully, maybe navigate to OTP verification page
            } else {
                message.error('Failed to send OTP');
            }
        } catch (error) {
            message.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
      <>
      {showOTPVerify ? <OTPVerify data={userData} apiEndPoint='login'/> :
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ maxWidth: '300px' }}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" disabled={loading} />
                </Form.Item>
        
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Get OTP
                    </Button>
                </Form.Item>
            </Form>
            
        </div>
      } 
      </>
    );
};

export default Login;
