import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";

export default function RoomPricing({ roomId }) {
  const [pricingList, setPricingList] = useState([]);
  const [newPricing, setNewPricing] = useState({
    startDate: "",
    endDate: "",
    price: "",
    label: "",
  });

  const handleAdd = () => {
    if (!newPricing.startDate || !newPricing.endDate || !newPricing.price) return;
    setPricingList((prev) => [
      ...prev,
      { ...newPricing, id: Date.now() },
    ]);
    setNewPricing({ startDate: "", endDate: "", price: "", label: "" });
  };

  const handleDelete = (id) => {
    setPricingList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPricing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Pricing for room", roomId, pricingList);
    // Gửi lên server: axios.post('/api/room-pricing', { roomId, pricingList })
  };

  return (
    <Box p={3} component={Paper} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Cài đặt giá phòng theo thời gian (Room #{roomId})
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            type="date"
            name="startDate"
            label="Từ ngày"
            InputLabelProps={{ shrink: true }}
            value={newPricing.startDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            type="date"
            name="endDate"
            label="Đến ngày"
            InputLabelProps={{ shrink: true }}
            value={newPricing.endDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            type="number"
            name="price"
            label="Giá"
            value={newPricing.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            name="label"
            label="Ghi chú"
            value={newPricing.label}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button fullWidth variant="contained" onClick={handleAdd}>
            Thêm
          </Button>
        </Grid>

        {/* Danh sách đã thêm */}
        {pricingList.map((item) => (
          <Grid key={item.id} item xs={12}>
            <Paper className="d-flex justify-content-between align-items-center p-3">
              <Typography>
                {item.startDate} → {item.endDate} | <strong>{item.price} $</strong> | {item.label}
              </Typography>
              <IconButton onClick={() => handleDelete(item.id)} color="error">
                <i className="fas fa-trash text-danger"></i>
              </IconButton>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Lưu bảng giá
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
