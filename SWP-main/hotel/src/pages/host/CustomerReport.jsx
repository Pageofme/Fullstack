import { Container, Row, Col, Card, ProgressBar, Badge } from "react-bootstrap";
import { Star, MessageSquare, Award } from "lucide-react";

export default function CustomerReport() {
  const reviews = [
    {
      guest: "John Smith",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent service and clean rooms. Staff was very helpful throughout my stay.",
    },
    {
      guest: "Sarah Johnson",
      rating: 4,
      date: "3 days ago",
      comment: "Good location and comfortable rooms. Breakfast could be improved.",
    },
    {
      guest: "Mike Wilson",
      rating: 5,
      date: "5 days ago",
      comment: "Outstanding experience! Will definitely come back.",
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 89 },
    { stars: 4, count: 45 },
    { stars: 3, count: 15 },
    { stars: 2, count: 5 },
    { stars: 1, count: 2 },
  ];

  const totalReviews = 156;

  return (
    <Container fluid className="py-4">

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div className="mb-3 d-flex justify-content-center align-items-center bg-primary bg-opacity-10 rounded-circle" style={{ width: 48, height: 48 }}>
                <Star className="text-primary" />
              </div>
              <div className="text-muted">Average Rating</div>
              <h4>4.5</h4>
              <div className="text-success">+0.3 from last month</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div className="mb-3 d-flex justify-content-center align-items-center bg-success bg-opacity-10 rounded-circle" style={{ width: 48, height: 48 }}>
                <MessageSquare className="text-success" />
              </div>
              <div className="text-muted">Total Reviews</div>
              <h4>{totalReviews}</h4>
              <div className="text-muted">This month</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <div className="mb-3 d-flex justify-content-center align-items-center bg-warning bg-opacity-10 rounded-circle" style={{ width: 48, height: 48 }}>
                <Award className="text-warning" />
              </div>
              <div className="text-muted">Satisfaction Rate</div>
              <h4>92%</h4>
              <div className="text-success">+5% improvement</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="gy-4">
        <Col lg={6}>
          <Card>
            <Card.Header>Recent Reviews</Card.Header>
            <Card.Body>
              {reviews.map((review, index) => (
                <div key={index} className="mb-4 border-bottom pb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <strong>{review.guest}</strong>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`me-1`}
                            size={16}
                            fill={i < review.rating ? "#facc15" : "none"}
                            stroke={i < review.rating ? "#facc15" : "#d1d5db"}
                          />
                        ))}
                      </div>
                      <small className="text-muted">{review.date}</small>
                    </div>
                  </div>
                  <div className="text-muted">{review.comment}</div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Header>Rating Distribution</Card.Header>
            <Card.Body>
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="d-flex align-items-center mb-3">
                  <div className="d-flex align-items-center me-2" style={{ width: "40px" }}>
                    <span className="me-1">{item.stars}</span>
                    <Star size={12} fill="#facc15" stroke="#facc15" />
                  </div>
                  <div className="flex-grow-1 me-2">
                    <ProgressBar
                      now={(item.count / totalReviews) * 100}
                      variant="warning"
                      style={{ height: "8px" }}
                    />
                  </div>
                  <small className="text-muted" style={{ width: "30px" }}>
                    {item.count}
                  </small>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
