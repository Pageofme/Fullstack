import { useState } from "react";
import { CalendarSection } from '../../components/host/CalendarSection';
import { BookingsTable } from '../../components/host/BookingsTable';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần của ChartJS
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function Dashboard() {
  console.log("Dashboard is rendering");

  // Trạng thái cho khoảng thời gian
  const [timeRange, setTimeRange] = useState('week');

  // Dữ liệu mẫu cho các khoảng thời gian
  const getRevenueData = (range) => {
    switch (range) {
      case 'month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Revenue',
              data: [5000, 6000, 7000, 6500],
              borderColor: 'rgba(255, 105, 180, 1)',
              backgroundColor: 'rgba(255, 105, 180, 0.2)',
              fill: true,
            },
          ],
        };
      case 'year':
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Revenue',
              data: [20000, 22000, 25000, 23000, 24000, 26000],
              borderColor: 'rgba(255, 105, 180, 1)',
              backgroundColor: 'rgba(255, 105, 180, 0.2)',
              fill: true,
            },
          ],
        };
      case 'week':
      default:
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Revenue',
              data: [1200, 1500, 1800, 1300, 2000, 1700],
              borderColor: 'rgba(255, 105, 180, 1)',
              backgroundColor: 'rgba(255, 105, 180, 0.2)',
              fill: true,
            },
          ],
        };
    }
  };

  const getRoomsData = (range) => {
    switch (range) {
      case 'month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Occupied',
              data: [50, 60, 70, 55],
              borderColor: 'rgba(255, 105, 180, 1)',
              backgroundColor: 'rgba(255, 105, 180, 0.2)',
              fill: true,
            },
            {
              label: 'Available',
              data: [20, 15, 10, 25],
              borderColor: 'rgba(255, 165, 0, 1)',
              backgroundColor: 'rgba(255, 165, 0, 0.2)',
              fill: true,
            },
          ],
        };
      case 'year':
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Occupied',
              data: [100, 110, 120, 115, 130, 140],
              borderColor: 'rgba(255, 105, 180, 1)',
              backgroundColor: 'rgba(255, 105, 180, 0.2)',
              fill: true,
            },
            {
              label: 'Available',
              data: [50, 40, 30, 35, 20, 10],
              borderColor: 'rgba(255, 165, 0, 1)',
              backgroundColor: 'rgba(255, 165, 0, 0.2)',
              fill: true,
            },
          ],
        };
      case 'week':
      default:
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Occupied',
              data: [20, 25, 30, 15, 35, 28],
              borderColor: 'rgba(255, 105, 180, 1)',
              backgroundColor: 'rgba(255, 105, 180, 0.2)',
              fill: true,
            },
            {
              label: 'Available',
              data: [30, 25, 20, 35, 15, 22],
              borderColor: 'rgba(255, 165, 0, 1)',
              backgroundColor: 'rgba(255, 165, 0, 0.2)',
              fill: true,
            },
          ],
        };
    }
  };

  // Dữ liệu cho Today Activities
  const todayActivities = {
    rooms: 5,
    blocked: 10,
    guests: 15,
  };

  // Dữ liệu cho Total Revenue
  const totalRevenue = 'Rs.35k';

  // Dữ liệu cho Overall Rating
  const overallRating = 4.5;
  const ratingDetails = [
    { label: 'Cleanliness', value: 4.5 },
    { label: 'Facilities', value: 4.0 },
    { label: 'Room Comfort', value: 4.2 },
    { label: 'Service', value: 4.3 },
    { label: 'Value for money', value: 4.1 },
  ];

  return (
    <Container fluid className="px-0">
      <Row>
        {/* Revenue Section */}
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              Revenue {timeRange}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setTimeRange('week')}>Week</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeRange('month')}>Month</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeRange('year')}>Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Body>
              <Line data={getRevenueData(timeRange)} options={{ maintainAspectRatio: false, responsive: true }} style={{ height: '300px', width: '100%' }} />
            </Card.Body>
          </Card>
        </Col>
        {/* Rooms Section */}
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              Rooms  {timeRange}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setTimeRange('week')}>Week</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeRange('month')}>Month</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeRange('year')}>Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Body>
              <Line data={getRoomsData(timeRange)} options={{ maintainAspectRatio: false, responsive: true }} style={{ height: '300px', width: '100%' }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {/* Today's Booking Section */}
        <Col lg={12}>
          <BookingsTable />
        </Col>
      </Row>
  
      <Row>
    {/* Rating Section */}
       
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header>Overall Rating <small>This Week</small></Card.Header>
            <Card.Body className="text-center">
              <div className="display-4">{overallRating}/5</div>
              {ratingDetails.map((item, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}