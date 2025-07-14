import { Card, Button, Dropdown, Row, Col } from "react-bootstrap";
import { ChevronDown } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const revenueData = [
  { name: "Mon", value: 8 },
  { name: "Tue", value: 12 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 10 },
  { name: "Fri", value: 13 },
  { name: "Sat", value: 14 },
];

const guestsData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 25 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 22 },
  { name: "Fri", value: 28 },
];

const roomsData = [
  { name: "Mon", occupied: 25, booked: 15, available: 10 },
  { name: "Tue", occupied: 30, booked: 12, available: 8 },
  { name: "Wed", occupied: 28, booked: 18, available: 4 },
  { name: "Thu", occupied: 32, booked: 10, available: 8 },
  { name: "Fri", occupied: 35, booked: 8, available: 7 },
  { name: "Sat", occupied: 38, booked: 6, available: 6 },
];

export function ChartsSection() {
  return (
    <Row className="g-4">
      {/* Revenue Chart */}
      <Col lg={4}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Revenue</h6>
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm">
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
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Guests Chart */}
      <Col lg={4}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Guests</h6>
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm">
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
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={guestsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>

      {/* Rooms Chart */}
      <Col lg={4}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Rooms</h6>
            <Dropdown>
              <Dropdown.Toggle variant="light" size="sm">
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
            <div className="mb-3">
              <small className="text-muted">Total 50 Rooms</small>
              <div className="d-flex gap-3 mt-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: 12, height: 12, backgroundColor: '#3b82f6' }} />
                  <span>Occupied</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: 12, height: 12, backgroundColor: '#10b981' }} />
                  <span>Booked</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="rounded-circle" style={{ width: 12, height: 12, backgroundColor: '#f59e0b' }} />
                  <span>Available</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={roomsData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="occupied" stackId="a" fill="#3b82f6" />
                <Bar dataKey="booked" stackId="a" fill="#10b981" />
                <Bar dataKey="available" stackId="a" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
