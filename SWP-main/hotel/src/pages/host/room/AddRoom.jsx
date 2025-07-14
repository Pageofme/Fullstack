import { useState } from "react";
import RoomForm from "../../../components/host/RoomForm";

export default function AddRoom() {
  const [formData, setFormData] = useState({
    roomNo: "",
    roomType: "",
    ac: "",
    meal: "",
    capacity: "",
    rent: "",
    status: "",
    mobile: "",
    note: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Room data:", formData);
    // Gửi formData lên server
  };

  return (
    <RoomForm
      title="Add Room"
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => console.log("Cancelled")}
    />
  );
}
