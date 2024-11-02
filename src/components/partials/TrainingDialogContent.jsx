import {
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { StaticDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function TrainingDialogContent({
  training,
  handleChange,
  customers,
}) {
  return (
    <DialogContent>
      <FormControl fullWidth>
        <InputLabel id="customer-label">Customer</InputLabel>
        <Select
          required
          labelId="customer-label"
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
            <MenuItem
              key={customer._links.self.href}
              value={customer._links.self.href}
            >
              {customer.firstname} {customer.lastname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <StaticDateTimePicker
          required
          orientation="landscape"
          id="date"
          name="date"
          label="Date"
          value={dayjs(training.date)}
          format="DD.MM.YYYY HH:mm"
          minutesStep={15}
          onChange={(date) =>
            handleChange({ target: { name: "date", value: date } })
          }
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          required
          fullWidth
          margin="dense"
          id="duration"
          name="duration"
          label="Duration (minutes)"
          type="number"
          variant="standard"
          onChange={handleChange}
          value={training.duration}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          required
          margin="dense"
          id="activity"
          label="Activity"
          name="activity"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
          value={training.activity}
        />
      </FormControl>
    </DialogContent>
  );
}
