import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import OTPVerify from '../OTPVerfiy/OTPVefiy';

const { Option } = Select;

const Register = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [userData, setUserData] = useState('')

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'avatar' && values[key]) {
                    values[key].forEach(file => {
                        formData.append(key, file.originFileObj);
                    });
                } else {
                    formData.append(key, values[key]);
                }
            });

            const response = await axios.post('http://localhost:5000/api/auth/signup/generateotp', formData);

            if (response.status === 200) {
                setUserData(response.data);
                console.log(response.data)
                message.success(response.data.otpMessage);
                setOtpSent(true); 
            } else {
                message.error('Registration failed');
            }
        } catch (error) {
            message.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                {/* <Option value="87">+87</Option> */}
            </Select>
        </Form.Item>
    );

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            {otpSent ? ( 
                <OTPVerify data={userData}/>
            ) : (
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: '500px' }}
                >
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                            {
                                min: 3,
                                message: 'First name must be at least 3 characters!',
                            },
                            {
                                max: 15,
                                message: 'First name cannot exceed 15 characters!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your first name" disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                min: 3,
                                message: 'Last name must be at least 3 characters!',
                            },
                            {
                                max: 15,
                                message: 'Last name cannot exceed 15 characters!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your last name" disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your gender!',
                            },
                        ]}
                    >
                        <Select placeholder="Select your gender" disabled={loading}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter your email" disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        name="mobileNumber"
                        label="Mobile Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mobile number!',
                            },
                            {
                                pattern: /^[0-9]{10}$/,
                                message: 'Mobile number must be exactly 10 digits and only contain numbers!',
                            },
                        ]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Enter your mobile number" disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        name="avatar"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                                message: 'Please Choose a Profile Pic!',
                            },
                        ]}
                    >
                        <Upload name="logo" listType="picture" disabled={loading}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox disabled={loading}>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default Register;
