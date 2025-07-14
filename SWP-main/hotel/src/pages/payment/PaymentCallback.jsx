import React, { useEffect, useState } from 'react';
import { Container, Alert, Button, Spinner } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/axiosConfig';

const PaymentCallback = () => {
  const { isLoggedIn } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      setIsLoading(true);

      if (!isLoggedIn) {
        setMessage('Vui lòng đăng nhập để xử lý thanh toán.');
        setStatus('danger');
        navigate('/admin/login');
        setIsLoading(false);
        return;
      }

      const vnpResponseCode = searchParams.get('vnp_ResponseCode');
      const vnpTxnRef = searchParams.get('vnp_TxnRef');
      const vnpAmount = searchParams.get('vnp_Amount');
      const momoResultCode = searchParams.get('resultCode');
      const momoOrderId = searchParams.get('orderId');
      const momoAmount = searchParams.get('amount');

      try {
        const response = await axios.get(`/api/payments/callback`, {
          params: {
            vnp_ResponseCode: vnpResponseCode,
            vnp_TxnRef: vnpTxnRef,
            vnp_Amount: vnpAmount,
            resultCode: momoResultCode,
            orderId: momoOrderId,
            amount: momoAmount
          }
        });
        setMessage(response.data);
        const isSuccess = vnpResponseCode === '00' || momoResultCode === '0';
        setStatus(isSuccess ? 'success' : 'danger');
        if (isSuccess) {
          setTimeout(() => navigate('/booking-success'), 2000);
        }
      } catch (error) {
        console.error('Error processing payment callback:', error);
        setMessage('Lỗi khi xử lý thanh toán. Vui lòng thử lại.');
        setStatus('danger');
        if (error.response?.status === 401) {
          navigate('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [searchParams, navigate, isLoggedIn]);

  return (
    <Container className="my-5 text-center">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-3">Đang xử lý thanh toán...</span>
        </div>
      ) : (
        <Alert variant={status}>
          <Alert.Heading>{status === 'success' ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}</Alert.Heading>
          <p>{message}</p>
          <hr />
          <p className="mb-0">
            {status === 'success'
              ? 'Cảm ơn bạn đã đặt phòng. Bạn sẽ được chuyển hướng đến trang xác nhận.'
              : 'Vui lòng thử lại hoặc liên hệ hỗ trợ.'}
          </p>
          {status !== 'success' && (
            <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>
              Quay về trang chủ
            </Button>
          )}
        </Alert>
      )}
    </Container>
  );
};

export default PaymentCallback;