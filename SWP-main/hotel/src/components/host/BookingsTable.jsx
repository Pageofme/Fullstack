import { useState } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Badge,
} from "react-bootstrap";

const bookingData = [
  {
    id: 1,
    name: "Sally Graham",
    email: "sally@example.com",
    phone: "0123456789",
    roomType: "Queen",
    roomNumber: "R01",
    status: "Check In",
    services: ["Breakfast", "Spa"],
    checkIn: "12/06/2025",
    checkOut: "17/06/2025",
    paidAmount: "$1550",
    dueAmount: "$0",
    paymentStatus: "Success",
  },
  {
    id: 2,
    name: "Frank Baker",
    email: "frank@example.com",
    phone: "0987654321",
    roomType: "Single",
    roomNumber: "R02",
    status: "Booked",
    services: ["Airport Pickup"],
    checkIn: "10/06/2025",
    checkOut: "20/06/2025",
    paidAmount: "$0",
    dueAmount: "$230",
    paymentStatus: "Pending",
  },
];

export function BookingsTable() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [data, setData] = useState(bookingData);

  const handleRowClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const updateStatus = (newStatus) => {
    const updated = data.map((item) =>
      item.id === selectedBooking.id ? { ...item, status: newStatus } : item
    );
    setData(updated);
    setSelectedBooking({ ...selectedBooking, status: newStatus });
  };

  const autoUpdateCheckOut = () => {
    const today = new Date();
    const updated = data.map((item) => {
      const checkOutDate = new Date(item.checkOut.split("/").reverse().join("-"));
      if (item.status === "Booked" && today > checkOutDate) {
        return { ...item, status: "Check Out" };
      }
      return item;
    });
    setData(updated);
  };

  useState(() => {
    autoUpdateCheckOut();
  }, []);

  return (
    <>
      <Card className="mb-4">
        <Card.Header as="h5">Booking List</Card.Header>
        <Card.Body>
          <Table hover bordered responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Room Type</th>
                <th>Room No</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking) => (
                <tr
                  key={booking.id}
                  onClick={() => handleRowClick(booking)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{booking.name}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.roomNumber}</td>
                  <td>
                    <Badge
                      bg={
                        booking.status === "Check In"
                          ? "warning"
                          : booking.status === "Booked"
                          ? "primary"
                          : booking.status === "Check Out"
                          ? "secondary"
                          : "danger"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>{booking.paidAmount}</td>
                  <td>{booking.dueAmount}</td>
                  <td>
                    <Badge
                      bg={
                        booking.paymentStatus === "Success" ? "success" : "warning"
                      }
                    >
                      {booking.paymentStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBooking?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Email:</strong> {selectedBooking?.email}</p>
          <p><strong>Mobile:</strong> {selectedBooking?.phone}</p>
          <p><strong>Room:</strong> {selectedBooking?.roomType} - {selectedBooking?.roomNumber}</p>
          <p><strong>Check In:</strong> {selectedBooking?.checkIn}</p>
          <p><strong>Check Out:</strong> {selectedBooking?.checkOut}</p>
          <p><strong>Paid:</strong> {selectedBooking?.paidAmount}</p>
          <p><strong>Due:</strong> {selectedBooking?.dueAmount}</p>
          <p><strong>Services:</strong> {selectedBooking?.services.join(", ")}</p>
          <p><strong>Status:</strong> <Badge bg="info">{selectedBooking?.status}</Badge></p>

          <div className="d-flex gap-2 mt-3">
            {selectedBooking?.status === "Check In" && (
              <>
                <Button variant="primary" onClick={() => updateStatus("Booked")}>Chấp nhận (Booked)</Button>
                <Button variant="danger" onClick={() => updateStatus("Cancelled")}>Từ chối</Button>
              </>
            )}
            {selectedBooking?.status === "Booked" && (
              <Button variant="secondary" disabled>Booked</Button>
            )}
            {selectedBooking?.status === "Check Out" && (
              <Button variant="success" disabled>Đã hoàn tất</Button>
            )}
          </div>

          <Button
            variant="info"
            className="mt-3"
            onClick={() => {
              setShowModal(false);
              setShowInvoice(true);
            }}
          >
            Xem hóa đơn
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
        </Modal.Footer>
      </Modal>

      {showInvoice && selectedBooking && (
        <Card className="mt-4">
          <Card.Header>
            <h5>Hóa đơn của {selectedBooking.name}</h5>
          </Card.Header>
          <Card.Body>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Phone:</strong> {selectedBooking.phone}</p>
            <p><strong>Room:</strong> {selectedBooking.roomType} - {selectedBooking.roomNumber}</p>
            <p><strong>Check In:</strong> {selectedBooking.checkIn}</p>
            <p><strong>Check Out:</strong> {selectedBooking.checkOut}</p>
            <p><strong>Paid:</strong> {selectedBooking.paidAmount}</p>
            <p><strong>Due:</strong> {selectedBooking.dueAmount}</p>
            <p><strong>Payment Status:</strong> {selectedBooking.paymentStatus}</p>
            <p><strong>Services:</strong> {selectedBooking.services.join(", ")}</p>
            <Button variant="secondary" onClick={() => setShowInvoice(false)}>
              Đóng hóa đơn
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
