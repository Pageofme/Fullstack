import { useState, useEffect } from "react";
import RoomForm  from "../../../components/host/RoomForm";

export default function EditRoom() {
  const [formData, setFormData] = useState(null); // ban đầu là null

  useEffect(() => {
    // Giả sử bạn lấy dữ liệu từ API hoặc local data:
    const fetchedRoomData = {
      roomNo: "101",
      roomType: "Deluxe",
      ac: "Yes",
      meal: "Breakfast",
      capacity: "2",
      rent: "1000",
      status: "Available",
      mobile: "0987654321",
      note: "Ocean view",
      file: null,
    };
    setFormData(fetchedRoomData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edit Room data:", formData);
    // Gửi dữ liệu lên server hoặc xử lý
  };

  if (!formData) {
    return <div>Loading...</div>; // Tránh render form khi chưa có dữ liệu
  }

  return (
    <RoomForm
      title="Edit Room"
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => console.log("Cancelled")}
    />
  );
}
