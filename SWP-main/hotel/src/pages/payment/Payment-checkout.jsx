import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Alert, Container, ListGroup, Spinner, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import axios from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PaymentCheckout = ({ bookingId, onClose, onPaymentSuccess }) => {
  const { isLoggedIn } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [depositPaymentMethod, setDepositPaymentMethod] = useState('vnpay');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId || isNaN(bookingId)) {
        setError('Mã đặt phòng không hợp lệ.');
        setLoading(false);
        return;
      }

      if (!isLoggedIn) {
        setError('Vui lòng đăng nhập để tiếp tục thanh toán.');
        navigate('/admin/login');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/api/bookings/${bookingId}`, {
          params: { includeDetails: true }
        });

        const bookingData = response.data;

        if (Array.isArray(bookingData.serviceDetails)) {
          bookingData.services = bookingData.serviceDetails.map(service => ({
            id: service.id,
            serviceName: service.serviceType?.serviceName || `Dịch vụ #${service.id}`,
            price: service.price || 0,
            specialNotes: service.specialNotes || ''
          }));
        } else {
          bookingData.services = [];
        }

        setBookingDetails(bookingData);
        setError(null);
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Không thể tải thông tin đặt phòng. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, isLoggedIn, navigate]);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Vui lòng nhập mã khuyến mãi');
      return;
    }

    try {
      setIsProcessing(true);
      // Mock API call for promo validation (replace with actual API if available)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const validPromoCodes = {
        'SUMMER2025': 0.2,
        'HOMESTAY50': 0.5,
        'WELCOME10': 0.1
      };

      if (validPromoCodes[promoCode.toUpperCase()]) {
        setPromoDiscount(validPromoCodes[promoCode.toUpperCase()]);
        setPromoError(null);
      } else {
        setPromoError('Mã khuyến mãi không hợp lệ hoặc đã hết hạn');
        setPromoDiscount(0);
      }
    } catch (error) {
      setPromoError('Không thể xác minh mã khuyến mãi. Vui lòng thử lại.');
      setPromoDiscount(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentStatus(null);

      if (!isLoggedIn) {
        setError('Vui lòng đăng nhập để thực hiện thanh toán.');
        navigate('/admin/login');
        return;
      }

      const normalizedPaymentMethod = paymentMethod.toUpperCase().trim();
      const normalizedDepositPaymentMethod = depositPaymentMethod.toUpperCase().trim();
      const effectivePaymentMethod = normalizedPaymentMethod === "CASH"
        ? `DEPOSIT_${normalizedDepositPaymentMethod}`
        : normalizedPaymentMethod;

      const paymentData = {
        bookingId: bookingId,
        amount: finalAmount.toString(),
        paymentMethod: effectivePaymentMethod,
        status: "PENDING",
        transactionId: `TRX${Math.floor(Math.random() * 1000000)}`,
        paymentDate: new Date().toISOString(),
        isDeposit: normalizedPaymentMethod === "CASH",
        paymentDetails: `TxnRef: TRX${Math.floor(Math.random() * 1000000)}${normalizedPaymentMethod === "CASH" ? "; Deposit Payment" : ""}`
      };

      const response = await axios.post('/api/payments/create-payment-url', paymentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        window.location.href = response.data;
      } else {
        throw new Error('Không nhận được URL thanh toán từ server');
      }

      setPaymentStatus('success');
      onPaymentSuccess();
    } catch (error) {
      console.error('Payment error:', error.response?.data || error.message);
      const errorMessage = error.response?.status === 401
        ? 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.'
        : error.response?.data?.message || 'Thanh toán thất bại. Vui lòng thử lại.';
      setError(errorMessage);
      setPaymentStatus('error');
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateNights = () => {
    if (!bookingDetails?.checkInDate || !bookingDetails?.checkOutDate) return 0;
    return Math.ceil((new Date(bookingDetails.checkOutDate) - new Date(bookingDetails.checkInDate)) / (1000 * 60 * 60 * 24));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const paymentMethods = [
    {
      id: 'cash',
      label: 'Tiền mặt',
      icon: 'bi-wallet2',
      description: 'Thanh toán khi nhận phòng (yêu cầu đặt cọc 30%)',
      badgeVariant: 'warning'
    },
    {
      id: 'vnpay',
      label: 'VNPay',
      icon: 'bi-credit-card',
      description: 'Thanh toán qua thẻ ngân hàng/VNPay',
      badgeVariant: 'primary'
    },
    {
      id: 'qr',
      label: 'QR Code',
      icon: 'bi-qr-code',
      description: 'Quét mã QR để thanh toán',
      badgeVariant: 'info'
    }
  ];

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-3">Đang tải thông tin đặt phòng...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={onClose}>
          Quay lại
        </Button>
      </Container>
    );
  }

  if (!bookingDetails) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="danger">Không tìm thấy thông tin đặt phòng.</Alert>
        <Button variant="primary" onClick={onClose}>
          Quay lại
        </Button>
      </Container>
    );
  }

  const nights = calculateNights();
  const totalAmount = bookingDetails.totalAmount || 0;
  const depositAmount = totalAmount * 0.3;
  const finalAmount = (paymentMethod === 'cash' ? depositAmount : totalAmount) * (1 - promoDiscount);
  const guestLabel = `${bookingDetails.totalPeople} khách${bookingDetails.pets > 0 ? `, ${bookingDetails.pets} thú cưng` : ''}`;

  const renderPaymentSuccess = () => (
    <Alert variant="success" className="text-center">
      <div className="mb-2">
        <i className="bi bi-check-circle-fill fs-1"></i>
      </div>
      <h5>Thanh toán thành công!</h5>
      <p className="mb-0">Chúng tôi đã gửi xác nhận đến email của bạn.</p>
    </Alert>
  );

  return (
    <Container className="py-4">
      {paymentStatus === 'success' ? (
        renderPaymentSuccess()
      ) : (
        <Row className="g-3">
          <Col lg={7} xs={12}>
            <Card className="border-0 shadow-sm mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0 text-primary">
                    <i className="bi bi-credit-card me-2"></i>
                    Thanh toán
                  </h4>
                  <Button
                    variant="outline-secondary"
                    onClick={onClose}
                    size="sm"
                  >
                    <i className="bi bi-arrow-left me-1"></i> Quay lại
                  </Button>
                </div>
                <div className="mb-4">
                  <h5 className="fw-bold mb-3 d-flex align-items-center">
                    <i className="bi bi-wallet2 me-2"></i>
                    Chọn phương thức thanh toán
                  </h5>
                  <div className="d-flex flex-column gap-2">
                    {paymentMethods.map((method) => (
                      <Card
                        key={method.id}
                        className={`cursor-pointer transition-all ${paymentMethod === method.id ? 'border-primary bg-primary-light' : ''}`}
                        onClick={() => setPaymentMethod(method.id)}
                        style={{
                          borderLeft: paymentMethod === method.id ? '4px solid #0d6efd' : '4px solid transparent'
                        }}
                      >
                        <Card.Body className="py-3">
                          <div className="d-flex align-items-center">
                            <Badge
                              pill
                              bg={method.badgeVariant}
                              className="me-3"
                              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <i className={`bi ${method.icon} fs-5 text-white`}></i>
                            </Badge>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-center">
                                <h6 className={`mb-0 ${paymentMethod === method.id ? 'text-primary fw-bold' : ''}`}>
                                  {method.label}
                                </h6>
                                {paymentMethod === method.id && (
                                  <i className="bi bi-check-circle-fill text-primary"></i>
                                )}
                              </div>
                              <small className="text-muted">{method.description}</small>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
                {paymentMethod === 'cash' && (
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3 d-flex align-items-center">
                      <i className="bi bi-cash-coin me-2"></i>
                      Thanh toán đặt cọc (30%)
                    </h5>
                    <Alert variant="info" className="d-flex align-items-center">
                      <i className="bi bi-info-circle-fill me-2 fs-5"></i>
                      <div>
                        <strong>Lưu ý:</strong> Thanh toán bằng tiền mặt yêu cầu đặt cọc 30% ({formatCurrency(depositAmount)}).
                        Vui lòng chọn phương thức thanh toán cho khoản đặt cọc.
                      </div>
                    </Alert>
                    <div className="d-flex gap-3">
                      <Button
                        variant={depositPaymentMethod === 'vnpay' ? 'primary' : 'outline-primary'}
                        className="flex-grow-1 py-2 d-flex flex-column align-items-center"
                        onClick={() => setDepositPaymentMethod('vnpay')}
                      >
                        <i className="bi bi-credit-card fs-3 mb-2"></i>
                        <span>VNPay</span>
                        <small className="text-muted">Thẻ ngân hàng</small>
                      </Button>
                      <Button
                        variant={depositPaymentMethod === 'qr' ? 'primary' : 'outline-primary'}
                        className="flex-grow-1 py-2 d-flex flex-column align-items-center"
                        onClick={() => setDepositPaymentMethod('qr')}
                      >
                        <i className="bi bi-qr-code fs-3 mb-2"></i>
                        <span>QR Code</span>
                        <small className="text-muted">Quét mã QR</small>
                      </Button>
                    </div>
                  </div>
                )}
                <div className="mb-3">
                  <h5 className="fw-bold mb-3 d-flex align-items-center">
                    <i className="bi bi-tag me-2"></i>
                    Mã khuyến mãi
                  </h5>
                  <Form.Group>
                    <div className="input-group mb-2">
                      <Form.Control
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Nhập mã khuyến mãi"
                        className="py-2"
                      />
                      <Button
                        variant="primary"
                        onClick={handleApplyPromo}
                        disabled={isProcessing || !promoCode.trim()}
                        className="px-4"
                      >
                        {isProcessing ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          'Áp dụng'
                        )}
                      </Button>
                    </div>
                    {promoError && (
                      <Alert variant="danger" className="py-2 d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {promoError}
                      </Alert>
                    )}
                    {promoDiscount > 0 && (
                      <Alert variant="success" className="py-2 d-flex align-items-center">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Đã áp dụng giảm giá {promoDiscount * 100}% ({formatCurrency(totalAmount * promoDiscount)})
                      </Alert>
                    )}
                  </Form.Group>
                </div>
                <Alert variant="light" className="border d-flex align-items-center">
                  <i className="bi bi-shield-lock text-primary fs-4 me-3"></i>
                  <small>
                    Thông tin thanh toán của bạn được bảo mật an toàn. Chúng tôi không lưu trữ thông tin thẻ của bạn.
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={5} xs={12}>
            <Card className="border-0 shadow-sm sticky-md-top" style={{ top: '20px' }}>
              <Card.Body>
                <h4 className="fw-bold mb-3 text-center">
                  <i className="bi bi-receipt me-2"></i>
                  Tóm tắt đơn hàng
                </h4>
                <Card className="border mb-4">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span className="text-muted">Homestay:</span>
                      <strong>{bookingDetails.homestayName || 'N/A'}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span className="text-muted">Phòng:</span>
                      <strong>{bookingDetails.roomNumber || 'N/A'}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span className="text-muted">Ngày nhận phòng:</span>
                      <strong>{bookingDetails.checkInDate ? new Date(bookingDetails.checkInDate).toLocaleDateString('vi-VN') : 'N/A'}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span className="text-muted">Ngày trả phòng:</span>
                      <strong>{bookingDetails.checkOutDate ? new Date(bookingDetails.checkOutDate).toLocaleDateString('vi-VN') : 'N/A'}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span className="text-muted">Số đêm:</span>
                      <strong>{nights} đêm</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span className="text-muted">Số khách:</span>
                      <strong>{guestLabel}</strong>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
                <div className="mb-4">
                  <h5 className="fw-bold mb-3">Chi tiết giá</h5>
                  <ListGroup variant="flush" className="mb-2">
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span><strong>Giá phòng ({nights} đêm) + dịch vụ</strong></span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </ListGroup.Item>
                    {bookingDetails.services?.map((service) => (
                      <ListGroup.Item key={service.id} className="d-flex justify-content-between">
                        <div>
                          <span>{service.serviceName}</span>
                          {service.specialNotes && (
                            <small className="text-muted d-block">{service.specialNotes}</small>
                          )}
                        </div>
                        <span>{formatCurrency(service.price)}</span>
                      </ListGroup.Item>
                    ))}
                    {paymentMethod === 'cash' && (
                      <ListGroup.Item className="d-flex justify-content-between text-primary">
                        <span>Đặt cọc (30%)</span>
                        <span>{formatCurrency(depositAmount)}</span>
                      </ListGroup.Item>
                    )}
                    {promoDiscount > 0 && (
                      <ListGroup.Item className="d-flex justify-content-between text-success">
                        <span>Giảm giá ({promoDiscount * 100}%)</span>
                        <span>-{formatCurrency(totalAmount * promoDiscount)}</span>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold mb-0">Tổng cộng</h5>
                      <h4 className="fw-bold text-primary mb-0">
                        {formatCurrency(finalAmount)}
                      </h4>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 py-3 fw-bold shadow"
                  onClick={handlePayment}
                  disabled={isProcessing || (paymentMethod === 'cash' && !depositPaymentMethod)}
                >
                  {isProcessing ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-lock-fill me-2"></i>
                      THANH TOÁN {formatCurrency(finalAmount)}
                    </>
                  )}
                </Button>
                <div className="text-center mt-3">
                  <small className="text-muted d-flex align-items-center justify-content-center">
                    <i className="bi bi-shield-lock me-2"></i>
                    Thanh toán an toàn với mã hóa SSL
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

PaymentCheckout.propTypes = {
  bookingId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired
};

export default PaymentCheckout;