import { DialogContent, TextField, Select, MenuItem } from "@mui/material";

export default function TrainingDialogContent({
  training,
  handleChange,
  customers,
}) {
  return (
    <DialogContent>
      <TextField
        autoFocus
        required
        margin="dense"
        id="date"
        name="date"
        label="Date"
        type="datetime-local"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={training.date}
      />
      <TextField
        required
        margin="dense"
        id="duration"
        name="duration"
        label="Duration (minutes)"
        type="number"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={training.duration}
      />
      <TextField
        required
        margin="dense"
        id="activity"
        name="activity"
        label="Activity"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={training.activity}
      />
      <Select
        required
        margin="dense"
        id="customer"
        name="customer"
        label="Customer"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={training.customer}
      >
        {customers.map((customer) => (
          <MenuItem key={customer.id} value={customer.id}>
            {customer.firstname} {customer.lastname}
          </MenuItem>
        ))}
      </Select>
    </DialogContent>
  );
}
