import { useState } from "react";
import {
  Table,
  Badge,
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
} from "react-bootstrap";

// Dummy room data
const initialRooms = [
  {
    id: 1,
    image: "https://via.placeholder.com/40",
    roomNo: "101",
    roomType: "Delux",
    ac: "AC",
    meal: "All",
    bed: 2,
    status: "Booked",
    rent: 25,
    mobile: "1234567890",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/40",
    roomNo: "102",
    roomType: "Super Delux",
    ac: "Non AC",
    meal: "Lunch",
    bed: 3,
    status: "Open",
    rent: 50,
    mobile: "1234567890",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/40",
    roomNo: "103",
    roomType: "Super Delux",
    ac: "AC",
    meal: "All",
    bed: 2,
    status: "Booked",
    rent: 31,
    mobile: "1234567890",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/40",
    roomNo: "104",
    roomType: "Delux",
    ac: "Non AC",
    meal: "Dinner",
    bed: 3,
    status: "Inactive",
    rent: 31,
    mobile: "1234567890",
  },
];

export default function AllRoom() {
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (room) => {
    setSelectedRoom({ ...room });
    setShowModal(true);
  };

  const updateField = (field, value) => {
    setSelectedRoom((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updated = rooms.map((r) =>
      r.id === selectedRoom.id ? selectedRoom : r
    );
    setRooms(updated);
    setShowModal(false);
  };

  const statusVariant = (status) => {
    switch (status) {
      case "Booked":
        return "primary";
      case "Open":
        return "success";
      case "Inactive":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">All Rooms</h4>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Room No</th>
            <th>Room Type</th>
            <th>AC/Non AC</th>
            <th>Meal</th>
            <th>Bed Capacity</th>
            <th>Status</th>
            <th>Rent</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr
              key={room.id}
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(room)}
            >
              <td>
                <Form.Check type="checkbox" />
              </td>
              <td>
                <Image src={room.image} roundedCircle width={40} height={40} />
              </td>
              <td>{room.roomNo}</td>
              <td>{room.roomType}</td>
              <td>{room.ac}</td>
              <td>{room.meal}</td>
              <td>{room.bed}</td>
              <td>
                <Badge bg={statusVariant(room.status)}>{room.status}</Badge>
              </td>
              <td>{room.rent}</td>
              <td>{room.mobile}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Room #{selectedRoom?.roomNo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room No</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedRoom?.roomNo || ""}
                    onChange={(e) => updateField("roomNo", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select
                    value={selectedRoom?.roomType}
                    onChange={(e) => updateField("roomType", e.target.value)}
                  >
                    <option>Delux</option>
                    <option>Super Delux</option>
                    <option>Double</option>
                    <option>Vila</option>
                    <option>Single</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>AC/Non AC</Form.Label>
                  <Form.Select
                    value={selectedRoom?.ac}
                    onChange={(e) => updateField("ac", e.target.value)}
                  >
                    <option>AC</option>
                    <option>Non AC</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Meal</Form.Label>
                  <Form.Select
                    value={selectedRoom?.meal}
                    onChange={(e) => updateField("meal", e.target.value)}
                  >
                    <option>All</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Breakfast</option>
                    <option>None</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRoom?.bed}
                    onChange={(e) => updateField("bed", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={selectedRoom?.status}
                    onChange={(e) => updateField("status", e.target.value)}
                  >
                    <option>Booked</option>
                    <option>Open</option>
                    <option>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rent</Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedRoom?.rent}
                    onChange={(e) => updateField("rent", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedRoom?.mobile}
                    onChange={(e) => updateField("mobile", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
