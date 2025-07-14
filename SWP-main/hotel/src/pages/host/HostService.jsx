import { Container, Row, Col, Card, Table, Badge, Button, ProgressBar } from "react-bootstrap";
import {
  BsCupHot,
  BsHouse,
  BsTools,
  BsChatDots,
  BsThreeDotsVertical
} from "react-icons/bs";
import { DashboardHeader } from '../../components/host/DashboardHeader';


export default function HostService() {
  const serviceRequests = [
    { type: "Room Service", guest: "John Smith", room: "101", priority: "High", status: "In Progress" },
    { type: "Housekeeping", guest: "Sarah Johnson", room: "205", priority: "Medium", status: "Pending" },
    { type: "Maintenance", guest: "Mike Wilson", room: "310", priority: "High", status: "Assigned" },
    { type: "Concierge", guest: "Emma Davis", room: "102", priority: "Low", status: "Completed" },
  ];

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "High": return "danger";
      case "Medium": return "warning";
      default: return "secondary";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Container className="my-4 flex-grow-1">
       

        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="text-center p-3">
              <BsCupHot size={32} className="text-primary mb-2 mx-auto" />
              <div className="text-muted">Food Services</div>
              <h3>28</h3>
              <div className="text-success small">Active orders</div>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center p-3">
              <BsHouse size={32} className="text-success mb-2 mx-auto" />
              <div className="text-muted">Housekeeping</div>
              <h3>15</h3>
              <div className="text-success small">Scheduled today</div>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center p-3">
              <BsTools size={32} className="text-warning mb-2 mx-auto" />
              <div className="text-muted">Maintenance</div>
              <h3>7</h3>
              <div className="text-warning small">Pending requests</div>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center p-3">
              <BsChatDots size={32} className="text-primary mb-2 mx-auto" />
              <div className="text-muted">Concierge</div>
              <h3>12</h3>
              <div className="text-info small">Guest requests</div>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={6}>
            <Card>
              <Card.Header>Active Service Requests</Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>SERVICE TYPE</th>
                      <th>GUEST</th>
                      <th>ROOM</th>
                      <th>PRIORITY</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceRequests.map((req, idx) => (
                      <tr key={idx}>
                        <td>{req.type}</td>
                        <td>{req.guest}</td>
                        <td>{req.room}</td>
                        <td>
                          <Badge bg={getPriorityVariant(req.priority)}>{req.priority}</Badge>
                        </td>
                        <td>
                          <Badge bg={getStatusVariant(req.status)}>{req.status}</Badge>
                        </td>
                        <td>
                          <Button variant="outline-secondary" size="sm">
                            <BsThreeDotsVertical />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card>
              <Card.Header>Service Distribution</Card.Header>
              <Card.Body>
                <div className="mb-3 text-center">
                  <div className="text-muted small mb-1">Room Service: 35%</div>
                  <ProgressBar now={35} label={`35%`} variant="primary" />
                </div>
                <Row className="small text-muted">
                  <Col xs={6} className="d-flex align-items-center mb-2">
                    <div className="me-2" style={{ width: 12, height: 12, backgroundColor: '#0d6efd', borderRadius: '50%' }}></div>
                    Room Service: 35
                  </Col>
                  <Col xs={6} className="d-flex align-items-center mb-2">
                    <div className="me-2" style={{ width: 12, height: 12, backgroundColor: '#198754', borderRadius: '50%' }}></div>
                    Housekeeping: 25
                  </Col>
                  <Col xs={6} className="d-flex align-items-center mb-2">
                    <div className="me-2" style={{ width: 12, height: 12, backgroundColor: '#ffc107', borderRadius: '50%' }}></div>
                    Maintenance: 20
                  </Col>
                  <Col xs={6} className="d-flex align-items-center mb-2">
                    <div className="me-2" style={{ width: 12, height: 12, backgroundColor: '#fd7e14', borderRadius: '50%' }}></div>
                    Concierge: 20
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
