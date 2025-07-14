import { Card, Button, Dropdown } from "react-bootstrap";
import { ChevronDown } from "lucide-react";

const ratingCategories = [
  { name: "Cleanliness", score: 4.5 },
  { name: "Facilities", score: 4.5 },
  { name: "Location", score: 2.5 },
  { name: "Room Comfort", score: 2.5 },
  { name: "Service", score: 3.8 },
  { name: "Value for money", score: 3.8 },
];

export function OverallRating() {
  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">Overall Rating</Card.Title>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" size="sm">
            This Week <ChevronDown size={16} className="ms-1" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>This Week</Dropdown.Item>
            <Dropdown.Item>This Month</Dropdown.Item>
            <Dropdown.Item>This Year</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>

      <Card.Body>
        <div className="text-center mb-4">
          <div className="text-muted small mb-2">Rating</div>
          <div className="position-relative mx-auto" style={{ width: 128, height: 128 }}>
            <svg
              className="position-absolute top-0 start-0"
              width="128"
              height="128"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeDasharray={`${(4.5 / 5) * 314} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="fw-bold fs-4">4.5/5</div>
            </div>
          </div>
          <div className="text-success small mt-2">+31%</div>
        </div>

        <div className="d-flex flex-column gap-3">
          {ratingCategories.map((category, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center">
              <span className="small">{category.name}</span>
              <div className="d-flex align-items-center gap-2">
                <div className="bg-light rounded-pill" style={{ width: 100, height: 8, overflow: "hidden" }}>
                  <div
                    className="bg-primary h-100"
                    style={{ width: `${(category.score / 5) * 100}%` }}
                  />
                </div>
                <span className="small fw-semibold" style={{ width: 32 }}>{category.score}</span>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}
