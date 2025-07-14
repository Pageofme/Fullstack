import { Card, Table, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export function Invoice() {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) return <p>Không tìm thấy hóa đơn!</p>;

  const totalAmount = parseFloat(booking.paidAmount.replace("$", "")) +
                      parseFloat(booking.dueAmount.replace("$", ""));

  return (
    <Card className="m-4">
      <Card.Header as="h4">Hóa đơn đặt phòng</Card.Header>
      <Card.Body>
        <p><strong>Khách hàng:</strong> {booking.name}</p>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Số điện thoại:</strong> {booking.phone}</p>
        <p><strong>Phòng:</strong> {booking.roomType} ({booking.roomNumber})</p>
        <p><strong>Ngày ở:</strong> {booking.checkIn} - {booking.checkOut}</p>
        <p><strong>Dịch vụ:</strong> {booking.services.join(", ") || "Không có"}</p>

        <Table bordered>
          <thead>
            <tr>
              <th>Mục</th>
              <th>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tổng cộng</td>
              <td>${totalAmount}</td>
            </tr>
            <tr>
              <td>Đã thanh toán</td>
              <td>{booking.paidAmount}</td>
            </tr>
            <tr>
              <td>Còn nợ</td>
              <td>{booking.dueAmount}</td>
            </tr>
            <tr>
              <td>Trạng thái thanh toán</td>
              <td>
                <Badge bg={booking.paymentStatus === "Success" ? "success" : "warning"}>
                  {booking.paymentStatus}
                </Badge>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
