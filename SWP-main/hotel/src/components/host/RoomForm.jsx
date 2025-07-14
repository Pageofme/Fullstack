import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const FileInput = styled("input")({
  display: "none",
});

export default function RoomForm({ formData, onChange, onSubmit, onCancel, title }) {
  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 900,
        mx: "auto",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              name="roomNo"
              label="Room No"
              value={formData.roomNo}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Select Room Type</InputLabel>
              <Select
                name="roomType"
                value={formData.roomType}
                label="Select Room Type"
                onChange={onChange}
              >
                {["Delux", "Super Delux", "Vila", "Double", "Single"].map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>AC/Non AC</InputLabel>
              <Select
                name="ac"
                value={formData.ac}
                label="AC/Non AC"
                onChange={onChange}
              >
                <MenuItem value="AC">AC</MenuItem>
                <MenuItem value="Non AC">Non AC</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Select Meal</InputLabel>
              <Select
                name="meal"
                value={formData.meal}
                label="Select Meal"
                onChange={onChange}
              >
                {["All", "Lunch", "Dinner", "Breakfast", "None"].map((meal) => (
                  <MenuItem key={meal} value={meal}>{meal}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="number"
              name="capacity"
              label="Capacity"
              value={formData.capacity}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={onChange}
              >
                {["Open", "Booked", "Inactive"].map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              name="rent"
              label="Rent"
              value={formData.rent}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              name="mobile"
              label="Mobile"
              value={formData.mobile}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderStyle: "dashed",
                textAlign: "center",
                color: "gray",
              }}
            >
              <label htmlFor="file-upload">
                <FileInput
                  id="file-upload"
                  type="file"
                  onChange={(e) => onChange({ target: { name: "file", value: e.target.files[0] } })}
                />
                <Button variant="outlined" component="span">
                  Choose file
                </Button>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  or drag and drop file here
                </Typography>
              </label>
              {formData.file && (
                <Typography mt={1}>Selected: {formData.file.name}</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="note"
              label="Note"
              value={formData.note}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12} display="flex" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="contained" color="error" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
