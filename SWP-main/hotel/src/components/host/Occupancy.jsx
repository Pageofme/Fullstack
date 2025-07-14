import { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

const initialRooms = [
    { id: 2, roomNumber: "102", type: "Deluxe", status: "Available", bed: "Queen Bed", guest: null, occupancy: "2 Adults" },
    { id: 3, roomNumber: "103", type: "Standard", status: "Booked", bed: "Double Bed", guest: null, occupancy: "1 Adult" },
    { id: 5, roomNumber: "105", type: "Suite", status: "Booked", bed: "King Bed", guest: null, occupancy: "2 Adults, 1 Child" },
    { id: 6, roomNumber: "201", type: "Family Suite", status: "Available", bed: "King Bed", guest: null, occupancy: "2 Adults, 3 Children" },
    { id: 7, roomNumber: "202", type: "Business Room", status: "Available", bed: "Single Bed", guest: null, occupancy: "1 Adult" },
    { id: 8, roomNumber: "204", type: "Super Deluxe", status: "Booked", bed: "Queen Bed", guest: null, occupancy: "1 Adult" },
    { id: 9, roomNumber: "206", type: "Deluxe", status: "Available", bed: "Double Bed", guest: null, occupancy: "2 Adults" },
    { id: 10, roomNumber: "301", type: "Deluxe", status: "Booked", bed: "King Bed", guest: null, occupancy: "2 Adults, 2 Children" },
    { id: 11, roomNumber: "303", type: "Super Deluxe", status: "Available", bed: "Queen Bed", guest: null, occupancy: "2 Adults" },
    { id: 12, roomNumber: "305", type: "Business Room", status: "Booked", bed: "Double Bed", guest: null, occupancy: "1 Adult" },
    { id: 13, roomNumber: "306", type: "Family Suite", status: "Available", bed: "Queen Bed", guest: null, occupancy: "2 Adults, 1 Child" },
    { id: 14, roomNumber: "402", type: "Deluxe", status: "Booked", bed: "King Bed", guest: null, occupancy: "2 Adults, 2 Children" },
];

export default function Occupancy() {
    const [rooms] = useState(initialRooms);
    const [statusFilter, setStatusFilter] = useState("All");
    const [roomTypeFilter, setRoomTypeFilter] = useState("All");
    const [bedSizeFilter, setBedSizeFilter] = useState("All");

    const filteredRooms = rooms.filter((room) => {
        const statusMatch = statusFilter === "All" || room.status === statusFilter;
        const typeMatch = roomTypeFilter === "All" || room.type === roomTypeFilter;
        const bedMatch = bedSizeFilter === "All" || room.bed.includes(bedSizeFilter);
        return statusMatch && typeMatch && bedMatch;
    });

    return (
        <div className="p-3">
            <h2 className="mb-4">Room Availability</h2>
            <Row className="mb-3">
                <Col md={3}>
                    <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Available">Available</option>
                        <option value="Booked">Booked</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)}>
                        <option value="All">All Room Types</option>
                        {[...new Set(rooms.map((r) => r.type))].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select value={bedSizeFilter} onChange={(e) => setBedSizeFilter(e.target.value)}>
                        <option value="All">All Bed Sizes</option>
                        {[...new Set(rooms.map((r) => r.bed))].map((bed) => (
                            <option key={bed} value={bed}>{bed}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Button variant="secondary" onClick={() => {
                        setStatusFilter("Available");
                        setRoomTypeFilter("All");
                        setBedSizeFilter("All");
                    }}>Clear</Button>
                </Col>
            </Row>

            <Row>
                {filteredRooms.map((room) => (
                    <Col key={room.id} md={3} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <strong>Room</strong>
                                    <span className={room.status === "Available" ? "text-success" : "text-danger"}>
                                        {room.status}
                                    </span>
                                </div>
                                <h4 className="mt-2">#{room.roomNumber}</h4>
                                <div className="mb-2">{room.type}</div>
                                <div className="mb-1"><small>{room.bed}</small></div>
                                <div><small>{room.occupancy}</small></div>
                                <Button variant="link" size="sm" className="p-0 mt-2">Add Guest</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
