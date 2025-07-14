import { Card, Badge, Row, Col } from "react-bootstrap";
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";

export function StatsCards() {
  return (
    <Row className="g-4">
      <Col md={3}>
        <Card>
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="d-flex justify-content-center align-items-center rounded-circle bg-primary bg-opacity-10" style={{ width: 48, height: 48 }}>
              <ArrowRight size={24} className="text-primary" />
            </div>
            <div>
              <div className="text-muted small">Arrival (This week)</div>
              <div className="fs-4 fw-bold">73</div>
              <Badge bg="success" className="mt-1">+24%</Badge>
              <div className="text-muted small mt-1">Previous week: 35</div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="d-flex justify-content-center align-items-center rounded-circle bg-warning bg-opacity-10" style={{ width: 48, height: 48 }}>
              <ArrowLeft size={24} className="text-warning" />
            </div>
            <div>
              <div className="text-muted small">Departure (This week)</div>
              <div className="fs-4 fw-bold">35</div>
              <Badge bg="danger" className="mt-1">-12%</Badge>
              <div className="text-muted small mt-1">Previous week: 97</div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="d-flex justify-content-center align-items-center rounded-circle bg-info bg-opacity-10" style={{ width: 48, height: 48 }}>
              <Calendar size={24} className="text-info" />
            </div>
            <div>
              <div className="text-muted small">Booking (This week)</div>
              <div className="fs-4 fw-bold">237</div>
              <Badge bg="success" className="mt-1">+31%</Badge>
              <div className="text-muted small mt-1">Previous week: 187</div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={3}>
        <Card>
          <Card.Body>
            <div className="mb-3 text-muted small">Today Activities</div>
            <div className="mb-3 d-flex gap-2">
              <Badge bg="primary">5</Badge>
              <Badge bg="primary">10</Badge>
              <Badge bg="primary">15</Badge>
            </div>
            <div className="text-muted small mb-3">Room Available Blocked Guest</div>
            <div>
              <div className="text-muted small">Total Revenue</div>
              <div className="fs-4 fw-bold">Rs.35k</div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
