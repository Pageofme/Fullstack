import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { MessageCircle } from "lucide-react";
import { DashboardHeader } from '../../components/host/DashboardHeader';


export default function Messages() {
  const messages = [
    {
      guest: "John Smith",
      room: "Room 101",
      time: "2 hours ago",
      message:
        "The air conditioning in my room is not working properly. Could you please send someone to fix it?",
      priority: "High",
      status: "Unread",
    },
    {
      guest: "Sarah Johnson",
      room: "Room 205",
      time: "4 hours ago",
      message:
        "Thank you for the excellent service during my stay. The staff was very helpful.",
      priority: "Low",
      status: "Read",
    },
  ];

  const renderPriorityBadge = ({ priority }) => {
    return (
      <Badge bg={priority === "High" ? "danger" : "secondary"}>{priority}</Badge>
    );
  };

  const renderStatusBadge = (status) => {
    return (
      <Badge bg={status === "Unread" ? "primary" : "secondary"}>{status}</Badge>
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">

      <Container className="flex-grow-1 py-4">

        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <div className="mb-3">
                  <MessageCircle size={32} className="text-primary" />
                </div>
                <Card.Title>Total Messages</Card.Title>
                <h3>24</h3>
                <Card.Text>This week</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <div className="mb-3">
                  <MessageCircle size={32} className="text-success" />
                </div>
                <Card.Title>Replied</Card.Title>
                <h3>18</h3>
                <Card.Text className="text-success">75% response rate</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <div className="mb-3">
                  <MessageCircle size={32} className="text-warning" />
                </div>
                <Card.Title>Pending</Card.Title>
                <h3>6</h3>
                <Card.Text className="text-warning">Awaiting response</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Header>
            <h5 className="mb-0">Recent Messages</h5>
          </Card.Header>
          <Card.Body>
            {messages.map((msg, index) => (
              <div
                key={index}
                className="border rounded p-3 mb-3"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <strong>{msg.guest}</strong> – <small className="text-muted">{msg.room}</small>
                    <small className="text-muted ms-2">• {msg.time}</small>
                  </div>
                  <div className="d-flex gap-2">
                    {renderPriorityBadge(msg.priority)}
                    {renderStatusBadge(msg.status)}
                  </div>
                </div>
                <p className="text-muted">{msg.message}</p>
                <div className="d-flex gap-2">
                  <Button size="sm">Reply</Button>
                  <Button variant="outline-secondary" size="sm">
                    Mark Read
                  </Button>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
