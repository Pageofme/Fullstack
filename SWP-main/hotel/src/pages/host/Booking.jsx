import { Container, Row, Col, Card, Badge, Button, Table } from "react-bootstrap";
import { Calendar, Home, Clock } from "lucide-react";
import { BookingsTable } from "../../components/host/BookingsTable";


export default function Booking() {
  const scheduleData = [
    { guest: "John Smith", room: "101", type: "Check-in", time: "2:00 PM", status: "Pending" },
    { guest: "Sarah Johnson", room: "205", type: "Check-out", time: "11:00 AM", status: "Completed" },
    { guest: "Mike Wilson", room: "310", type: "Check-in", time: "3:30 PM", status: "In Progress" },
  ];

  return (
    <Container fluid className="py-4">

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div className="mb-3 d-flex justify-content-center align-items-center bg-primary bg-opacity-10 rounded-circle" style={{ width: 48, height: 48 }}>
                <Calendar className="text-primary" />
              </div>
              <div className="text-muted mb-1">Today's Check-ins</div>
              <h4>12</h4>
              <div className="text-success">3 completed</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div className="mb-3 d-flex justify-content-center align-items-center bg-success bg-opacity-10 rounded-circle" style={{ width: 48, height: 48 }}>
                <Home className="text-success" />
              </div>
              <div className="text-muted mb-1">Today's Check-outs</div>
              <h4>8</h4>
              <div className="text-success">5 completed</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div className="mb-3 d-flex justify-content-center align-items-center bg-warning bg-opacity-10 rounded-circle" style={{ width: 48, height: 48 }}>
                <Clock className="text-warning" />
              </div>
              <div className="text-muted mb-1">Pending Actions</div>
              <h4>7</h4>
              <div className="text-warning">Requires attention</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <BookingsTable/>
    </Container>
  );
}
