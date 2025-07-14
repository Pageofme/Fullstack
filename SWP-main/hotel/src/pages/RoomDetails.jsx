import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Collapse,
  Modal,
  Alert,
  ListGroup,
  Badge
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PaymentCheckout from './payment/Payment-checkout';

const RoomDetails = () => {
  const { homestayId, roomNumber } = useParams();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const [cancellationPolicies, setCancellationPolicies] = useState([]);
  const [homestayRules, setHomestayRules] = useState([]);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [messError, setMessError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [selectedServices, setSelectedServices] = useState({});
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    userId: null,
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [roomRes, reviewRes, cancelRes, rulesRes, servicesRes] = await Promise.all([
          axios.get(`/api/rooms/${homestayId}/${roomNumber}`),
          axios.get(`/api/reviews/room/${homestayId}/${roomNumber}`).catch(() => ({ data: [] })),
          axios.get(`/api/cancellation-policies/homestay/${homestayId}`).catch(() => ({ data: [] })),
          axios.get(`/api/homestay-rules/homestay/${homestayId}`).catch(() => ({ data: [] })),
          axios.get(`/api/services/homestay/${homestayId}`).catch(() => ({ data: [] })),
        ]);

        const roomDetails = roomRes.data;
        setRoomData({
          roomName: roomDetails.room.type,
          name: roomDetails.homestay.homestayName,
          star: roomDetails.room.rating || (reviewRes.data.length > 0
            ? reviewRes.data.reduce((sum, r) => sum + r.rating, 0) / reviewRes.data.length
            : 0),
          description: roomDetails.homestay.description || 'Không có mô tả',
          address: roomDetails.homestay.address || 'Không có địa chỉ',
          location: roomDetails.homestay.location || 'Không xác định',
          detailImageHomestay: roomDetails.images?.[0]?.imageUrl || roomDetails.homestayImages?.[0]?.imageUrl || '/images/homestay.jpg',
          price: roomDetails.room.price,
          capacity: roomDetails.room.capacity,
          status: roomDetails.room.status,
          amenities: roomDetails.amenities || [],
        });
        setReviews(reviewRes.data);
        setCancellationPolicies(cancelRes.data);
        setHomestayRules(rulesRes.data);
        setServices(servicesRes.data);

        const initialServices = servicesRes.data.reduce((acc, service) => {
          acc[service.id] = false;
          return acc;
        }, {});
        setSelectedServices(initialServices);

        if (isLoggedIn) {
          const me = await axios.get('/api/auth/me');
          setCustomerInfo({
            userId: me.data.id,
            fullName: me.data.fullName,
            email: me.data.email,
            phone: me.data.phone,
            address: me.data.address,
          });
        } else {
          setMessError('Chưa đăng nhập. Nhập thông tin thủ công.');
        }
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setError('Không thể tải chi tiết phòng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [homestayId, roomNumber, isLoggedIn]);

  const toggleGuestOptions = () => setShowGuestOptions(!showGuestOptions);

  const updateGuestCount = (type, delta) => {
    setGuests((prev) => {
      const updated = { ...prev };
      updated[type] = Math.max(0, updated[type] + delta);
      if (type === 'adults' && updated[type] === 0) updated[type] = 1;
      const totalGuests = updated.adults + updated.children + updated.infants;
      if (totalGuests > roomData?.capacity && delta > 0 && type !== 'pets') {
        setMessError(`Số khách vượt quá sức chứa tối đa (${roomData.capacity} người)`);
        return prev;
      }
      setMessError(null);
      return updated;
    });
  };

  const handleServiceChange = (serviceId) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const calculateTotalAmount = () => {
    if (!checkInDate || !checkOutDate || !roomData) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    let total = nights * roomData.price;

    const totalGuests = guests.adults + guests.children + guests.infants;
    services.forEach((service) => {
      if (selectedServices[service.id]) {
        if (service.specialNotes?.includes('per person')) {
          total += service.price * totalGuests;
        } else if (service.specialNotes?.includes('per day')) {
          total += service.price * nights;
        } else if (service.specialNotes?.includes('per person per day')) {
          total += service.price * totalGuests * nights;
        } else {
          total += service.price;
        }
      }
    });

    return total;
  };

  const getSelectedServicesSummary = () => {
    return services
      .filter((service) => selectedServices[service.id])
      .map((service) => ({
        name: service.serviceType?.serviceName || 'Dịch vụ không xác định',
        price: service.price,
        specialNotes: service.specialNotes || '',
      }));
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateCustomerInfo = () => {
    if (!customerInfo.fullName) return 'Vui lòng nhập họ tên.';
    if (!customerInfo.email || !/\S+@\S+\.\S+/.test(customerInfo.email)) return 'Vui lòng nhập email hợp lệ.';
    if (!customerInfo.phone || !/^\d{10,11}$/.test(customerInfo.phone)) return 'Vui lòng nhập số điện thoại hợp lệ (10-11 số).';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessError(null);

    if (!isLoggedIn) {
      setMessError('Vui lòng đăng nhập để đặt phòng.');
      navigate('/admin/login');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setMessError('Vui lòng chọn ngày nhận phòng và trả phòng');
      return;
    }
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setMessError('Ngày trả phòng phải sau ngày nhận phòng');
      return;
    }
    const totalGuests = guests.adults + guests.children + guests.infants;
    if (totalGuests > roomData?.capacity) {
      setMessError(`Số khách vượt quá sức chứa tối đa (${roomData.capacity} người)`);
      return;
    }

    const bookingDTO = {
      userId: customerInfo.userId,
      homestayId: parseInt(homestayId),
      roomNumber: roomNumber,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adults: guests.adults,
      children: guests.children,
      totalPeople: totalGuests,
      totalAmount: calculateTotalAmount(),
      services: Object.entries(selectedServices)
        .filter(([_, val]) => val)
        .map(([id]) => parseInt(id)),
    };

    try {
      const response = await axios.post('/api/bookings', bookingDTO);
      const bookingId = Number(response.data.id);
      if (isNaN(bookingId)) {
        throw new Error('Mã đặt phòng không hợp lệ nhận được từ server');
      }
      setBookingId(bookingId);
      setShowConfirmationModal(true);
    } catch (err) {
      console.error('Lỗi đặt phòng:', err);
      if (err.response?.status === 401) {
        setMessError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        navigate('/admin/login');
      } else {
        setMessError('Không thể tạo đặt phòng. Vui lòng thử lại.');
      }
    }
  };

  const handleConfirmBooking = () => {
    const validationError = validateCustomerInfo();
    if (validationError) {
      setMessError(validationError);
      return;
    }
    setShowConfirmationModal(false);
    setShowPaymentModal(true);
  };

  if (loading) return <Container className="text-center py-5"><Alert variant="info">Đang tải dữ liệu...</Alert></Container>;
  if (error) return <Container className="text-center py-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!roomData) return null;

  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(calculateTotalAmount());

  const totalGuests = guests.adults + guests.children + guests.infants;
  const guestLabel = `${totalGuests} khách${guests.pets > 0 ? `, ${guests.pets} thú cưng` : ''}`;
  const nights = checkInDate && checkOutDate
    ? Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col md={12}>
          <Card.Img
            variant="top"
            src={`/${roomData.detailImageHomestay}`}
            alt="Phòng chính"
            className="rounded"
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h2" className="mb-3">{roomData.roomName}</Card.Title>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="d-flex align-items-center">
                  <i className="bi bi-building text-muted me-2"></i>
                  <span>{roomData.name}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <i className="bi bi-geo-alt text-muted me-2"></i>
                  <span>{roomData.address} ({roomData.location})</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <i className="bi bi-star-fill text-warning me-2"></i>
                  <span>{roomData.star.toFixed(1)} sao</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <i className="bi bi-people text-muted me-2"></i>
                  <span>Sức chứa: {roomData.capacity} người</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-center">
                  <i className={`bi bi-${roomData.status ? 'check-circle' : 'x-circle'} ${roomData.status ? 'text-success' : 'text-danger'} me-2`}></i>
                  <span>Trạng thái: {roomData.status ? 'Còn trống' : 'Đã đặt'}</span>
                </ListGroup.Item>
              </ListGroup>
              <Card.Text className="text-muted mb-4">{roomData.description}</Card.Text>

              <Card.Title as="h3" className="mb-3">Tiện nghi chỗ ở</Card.Title>
              <Row className="gy-3 mb-3">
                {roomData.amenities.map((amenity, index) => (
                  <Col key={index} xs={12} sm={6} md={4}>
                    <Card className="h-100">
                      <Card.Body className="d-flex align-items-center">
                        <i className={`${amenity.iconClass || 'fas fa-check'} fs-5 me-3 text-primary`}></i>
                        <span className="fw-medium">{amenity.typeName}</span>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title as="h3" className="mb-4 pb-2 border-bottom">
                Dịch vụ bổ sung
              </Card.Title>

              {services.length > 0 ? (
                <Row className="g-4">
                  {services.map((service, index) => (
                    <Col lg={6} key={index}>
                      <Card
                        className={`h-100 border-0 shadow-sm hover-shadow transition-all ${selectedServices[service.id] ? 'border-start border-primary border-3' : ''}`}
                        onClick={() => handleServiceClick(service)}
                      >
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <Card.Title className="mb-0 text-primary">
                              {service.serviceType?.serviceName || 'Dịch vụ'}
                            </Card.Title>
                            <Badge pill bg="light" text="dark" className="fs-6">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(service.price)}
                            </Badge>
                          </div>

                          <Card.Text className="text-muted small mb-3">
                            {service.specialNotes || 'Không có mô tả'}
                          </Card.Text>

                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              {service.specialNotes && (
                                <Badge bg="info" className="me-2">
                                  {service.specialNotes}
                                </Badge>
                              )}
                            </div>

                            <Form.Check
                              type="switch"
                              id={`service-${service.id}`}
                              label="Chọn"
                              checked={selectedServices[service.id] || false}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleServiceChange(service.id);
                              }}
                              className="fw-bold"
                            />
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Alert variant="info" className="mb-0">
                  Hiện không có dịch vụ bổ sung nào
                </Alert>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h4" className="mb-3">Quy tắc chung</Card.Title>
              {homestayRules.length > 0 ? (
                <ListGroup variant="flush">
                  {homestayRules.map((rule, index) => (
                    <ListGroup.Item key={index} className="mb-2">
                      <span className="fw-semibold text-dark">{rule.ruleName}</span>: <span className="text-muted">{rule.description}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Alert variant="info">Không có quy tắc cụ thể.</Alert>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Đánh giá của khách</Card.Title>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Card key={index} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <strong>{review.userName || 'Ẩn danh'}</strong>
                          <span className="text-muted ms-2">({new Date(review.createdAt).toLocaleDateString('vi-VN')})</span>
                        </div>
                        <div className="d-flex">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi bi-star${i < Math.floor(review.rating) ? '-fill' : i < review.rating ? '-half' : ''} text-warning`}
                            ></i>
                          ))}
                        </div>
                      </div>
                      <Card.Text className="mb-0 text-muted">{review.comment}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info">Chưa có đánh giá nào.</Alert>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Chính sách hủy phòng</Card.Title>
              {cancellationPolicies.length > 0 ? (
                <ListGroup variant="flush">
                  {cancellationPolicies.map((policy, index) => (
                    <ListGroup.Item key={index}>
                      {policy.name}: {policy.description} (Hoàn tiền {policy.refundPercentage}% nếu hủy trước {policy.daysBeforeCheckin} ngày)
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Alert variant="info">Không có chính sách hủy phòng cụ thể.</Alert>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Vị trí</Card.Title>
              <div style={{ height: '300px', width: '100%' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.110419706312!2d108.245!3d16.0595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzM0LjIiTiAxMDjCsDE0JzUxLjAiRQ!5e0!3m2!1svi!2s!4v1625091234567"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="sticky-top" style={{ top: '20px', maxHeight: '90vh', overflowY: 'auto' }}>
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Tổng quan đặt phòng</Card.Title>
              <div className="mb-3">
                <strong>Phòng:</strong> {roomData.roomName} <br />
                <strong>Homestay:</strong> {roomData.name} <br />
                <strong>Ngày nhận phòng:</strong> {checkInDate ? new Date(checkInDate).toLocaleDateString('vi-VN') : 'Chưa chọn'} <br />
                <strong>Ngày trả phòng:</strong> {checkOutDate ? new Date(checkOutDate).toLocaleDateString('vi-VN') : 'Chưa chọn'} <br />
                <strong>Số khách:</strong> {guestLabel} <br />
                <strong>Dịch vụ bổ sung:</strong>
                {getSelectedServicesSummary().length > 0 ? (
                  <ListGroup variant="flush" className="mt-2">
                    {getSelectedServicesSummary().map((service, index) => (
                      <ListGroup.Item key={index}>
                        {service.name}: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)} {service.specialNotes ? `/${service.specialNotes}` : ''}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <span className="text-muted"> Không có dịch vụ nào được chọn.</span>
                )}
              </div>
              <Card.Title as="h3" className="mb-3">Tổng: {formattedPrice}</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nhận phòng</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Trả phòng</Form.Label>
                  <Form.Control
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                    min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : ''}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Khách</Form.Label>
                  <div
                    className="form-control d-flex justify-content-between align-items-center"
                    onClick={toggleGuestOptions}
                    style={{ cursor: 'pointer' }}
                  >
                    <span>{guestLabel}</span>
                    <i className={`bi bi-chevron-${showGuestOptions ? 'up' : 'down'}`}></i>
                  </div>

                  <Collapse in={showGuestOptions}>
                    <Card className="mt-2">
                      <Card.Body>
                        {[
                          { label: 'Người lớn', desc: 'Từ 13 tuổi trở lên', key: 'adults' },
                          { label: 'Trẻ em', desc: 'Độ tuổi 2 – 12', key: 'children' },
                          { label: 'Em bé', desc: 'Dưới 2 tuổi', key: 'infants' },
                          { label: 'Thú cưng', desc: 'Mang theo thú cưng?', key: 'pets' },
                        ].map(({ label, desc, key }) => (
                          <div key={key} className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                              <div className="fw-bold">{label}</div>
                              <div className="text-muted small">{desc}</div>
                            </div>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateGuestCount(key, -1);
                                }}
                                disabled={key === 'adults' && guests[key] <= 1}
                              >
                                -
                              </Button>
                              <span className="mx-2">{guests[key]}</span>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateGuestCount(key, 1);
                                }}
                                disabled={totalGuests >= roomData.capacity && key !== 'pets'}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Collapse>
                </Form.Group>

                {messError && <Alert variant="danger">{messError}</Alert>}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-bold"
                  disabled={!roomData.status}
                >
                  Xác nhận đặt phòng
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Xác nhận thông tin khách hàng */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thông tin khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Card.Title as="h5">Thông tin khách hàng</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerInfo.fullName}
                    onChange={(e) => handleCustomerInfoChange('fullName', e.target.value)}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                    placeholder="Nhập email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerInfo.phone}
                    onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                    placeholder="Nhập địa chỉ (không bắt buộc)"
                  />
                </Form.Group>
              </Form>
              {messError && <Alert variant="danger">{messError}</Alert>}
            </Col>

            <Col md={6}>
              <Card.Title as="h5">Thông tin đặt phòng</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Homestay:</strong> {roomData?.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phòng:</strong> {roomData?.roomName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Ngày nhận phòng:</strong> {checkInDate ? new Date(checkInDate).toLocaleDateString('vi-VN') : 'Chưa chọn'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Ngày trả phòng:</strong> {checkOutDate ? new Date(checkOutDate).toLocaleDateString('vi-VN') : 'Chưa chọn'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Số đêm:</strong> {nights} đêm
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Số khách:</strong> {guestLabel}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Dịch vụ bổ sung:</strong>
                  {getSelectedServicesSummary().length > 0 ? (
                    <ListGroup variant="flush" className="mt-2">
                      {getSelectedServicesSummary().map((service, index) => (
                        <ListGroup.Item key={index}>
                          {service.name}: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)} {service.specialNotes ? `/${service.specialNotes}` : ''}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <span className="text-muted">Không có dịch vụ nào được chọn.</span>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Tổng chi phí:</strong> {formattedPrice}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Alert variant="info" className="mt-3">
            Vui lòng kiểm tra kỹ thông tin trước khi xác nhận.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Quay lại
          </Button>
          <Button variant="primary" onClick={handleConfirmBooking}>
            Xác nhận và thanh toán
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Thanh toán */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentCheckout
            roomName={roomData?.roomName}
            homestayName={roomData?.name}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            guests={guestLabel}
            totalAmount={calculateTotalAmount()}
            depositAmount={calculateTotalAmount() * 0.3}
            selectedServices={getSelectedServicesSummary()}
            bookingId={bookingId}
            customerInfo={customerInfo}
            onClose={() => setShowPaymentModal(false)}
            onPaymentSuccess={() => {
              setShowPaymentModal(false);
              navigate('/booking-success');
            }}
          />
        </Modal.Body>
      </Modal>

      {/* Modal Dịch vụ */}
      <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService?.serviceType?.serviceName || 'Dịch vụ không xác định'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService?.images?.[0]?.imageUrl ? (
            <Card.Img
              variant="top"
              src={`/${selectedService.images[0].imageUrl}`}
              alt={selectedService.serviceType?.serviceName || 'Dịch vụ'}
              className="mb-3"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          ) : (
            <Alert variant="info">Không có hình ảnh cho dịch vụ này.</Alert>
          )}
          <ListGroup variant="flush" className="mb-3">
            <ListGroup.Item>
              <strong>Giá:</strong> {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(selectedService?.price || 0)}
              {selectedService?.specialNotes && <Badge bg="info" className="ms-2">{selectedService.specialNotes}</Badge>}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Mô tả:</strong> {selectedService?.serviceType?.description || 'Không có mô tả'}
            </ListGroup.Item>
          </ListGroup>
          <Form.Check
            type="switch"
            label="Chọn dịch vụ này"
            checked={selectedServices[selectedService?.id] || false}
            onChange={() => handleServiceChange(selectedService?.id)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowServiceModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RoomDetails;