import React, { useState } from 'react';
import { Modal, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const AuthModal = ({ show, onClose, onAuthSuccess }) => {
  const [key, setKey] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        if (key === 'login') {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: data.loginEmail,
                password: data.loginPassword,
            });
            localStorage.setItem('token', response.data.token);
            const meResponse = await axios.get('http://localhost:8080/api/auth/me', {
                headers: { Authorization: `Bearer ${response.data.token}` },
            });
            console.log('User info from /me (Login):', meResponse.data);
            const fullName = meResponse.data.fullName || data.loginEmail.split('@')[0];
            console.log('Using fullName:', fullName);
            setSuccess('Đăng nhập thành công!');
            onAuthSuccess({ fullName });
            onClose();
        } else {
            if (data.registerPassword !== data.registerConfirmPassword) {
                setError('Mật khẩu xác nhận không khớp');
                return;
            }
            const response = await axios.post('http://localhost:8080/api/auth/register', {
              userName: data.registerUserName,
              fullName: data.registerName,
              email: data.registerEmail,
              phone: data.registerPhone || null,
              birthdate: data.registerBirthdate || null,
              address: data.registerAddress || null,
              password: data.registerPassword,
          });
            localStorage.setItem('token', response.data.token);
            setSuccess('Đăng ký thành công!');
            onAuthSuccess({ fullName: data.registerName });
            setTimeout(() => {
                setKey('login');
                onClose();
            }, 1000);
        }
    } catch (err) {
        // Cải thiện xử lý lỗi
        if (err.response?.status === 400 && err.response?.data) {
            // Xử lý lỗi validation từ backend
            const errors = err.response.data;
            if (typeof errors === 'object') {
                const errorMessages = Object.values(errors).join(', ');
                setError(errorMessages);
            } else {
                setError(errors || 'Có lỗi xảy ra khi đăng ký');
            }
        } else {
            setError(err.response?.data?.message || 'Có lỗi xảy ra');
        }
    }
};

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/google', {
        token: credentialResponse.credential,
      });
      localStorage.setItem('token', response.data.token);
      const meResponse = await axios.get('http://localhost:8080/api/auth/me', {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });
      console.log('User info from /me (Google):', meResponse.data);
      const email = meResponse.data.email || 'user@example.com';
      const fullName = meResponse.data.fullName || email.split('@')[0];
      console.log('Using fullName from Google:', fullName);
      setSuccess('Đăng nhập Google thành công!');
      onAuthSuccess({ fullName });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi đăng nhập Google');
      console.error('Google Login Error:', err);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const email = e.target.elements.forgotEmail.value;
    try {
      await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setSuccess('Yêu cầu đặt lại mật khẩu đã được gửi!');
      setShowForgotPassword(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Đăng nhập hoặc Đăng ký</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <Tabs
          id="auth-tabs"
          activeKey={key}
          onSelect={(k) => {
            setKey(k);
            setShowForgotPassword(false);
          }}
          className="mb-3"
        >
          <Tab eventKey="login" title="Đăng nhập">
            {!showForgotPassword ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="loginEmail" placeholder="Nhập email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control type="password" name="loginPassword" placeholder="Nhập mật khẩu" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Đăng nhập
                </Button>
                <div className="text-center mt-2">
                  <a href="#" onClick={() => setShowForgotPassword(true)}>
                    Quên mật khẩu?
                  </a>
                </div>
              </Form>
            ) : (
              <Form onSubmit={handleForgotPassword}>
                <Form.Group className="mb-3" controlId="forgotEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="forgotEmail" placeholder="Nhập email của bạn" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Gửi yêu cầu đặt lại mật khẩu
                </Button>
                <div className="text-center mt-2">
                  <a href="#" onClick={() => setShowForgotPassword(false)}>
                    Quay lại đăng nhập
                  </a>
                </div>
              </Form>
            )}
          </Tab>
          <Tab eventKey="register" title="Đăng ký">
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="registerUserName">
                      <Form.Label>Tên người dùng</Form.Label>
                      <Form.Control
                          type="text"
                          name="registerUserName"
                          placeholder="Nhập tên người dùng"
                          required
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerName">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                          type="text"
                          name="registerName"
                          placeholder="Nhập họ và tên"
                          required
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                          type="email"
                          name="registerEmail"
                          placeholder="Nhập email"
                          required
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerPassword">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control
                          type="password"
                          name="registerPassword"
                          placeholder="Nhập mật khẩu"
                          required
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerConfirmPassword">
                      <Form.Label>Xác nhận mật khẩu</Form.Label>
                      <Form.Control
                          type="password"
                          name="registerConfirmPassword"
                          placeholder="Xác nhận mật khẩu"
                          required
                      />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                      Đăng ký
                  </Button>
              </Form>
          </Tab>
        </Tabs>
        <div className="social-login-section mt-4">
          <h6 className="text-center mb-3">hoặc</h6>
          <GoogleOAuthProvider clientId="736882827867-gjjrd24l8vofkj87nhe8kt1q0d7t9ako.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Lỗi đăng nhập Google')}
              theme="outline"
              size="large"
              width="100%"
            />
          </GoogleOAuthProvider>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;