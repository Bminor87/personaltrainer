import { DialogContent, TextField } from "@mui/material";

function CustomerDialogContent({ customer, handleChange }) {
  return (
    <DialogContent>
      <TextField
        autoFocus
        required
        margin="dense"
        id="firstname"
        name="firstname"
        label="First Name"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.firstname}
      />
      <TextField
        required
        margin="dense"
        id="lastname"
        name="lastname"
        label="Last Name"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.lastname}
      />
      <TextField
        required
        margin="dense"
        id="streetaddress"
        name="streetaddress"
        label="Street Address"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.streetaddress}
      />
      <TextField
        required
        margin="dense"
        id="postcode"
        name="postcode"
        label="Postcode"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.postcode}
      />
      <TextField
        required
        margin="dense"
        id="city"
        name="city"
        label="City"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.city}
      />
      <TextField
        required
        margin="dense"
        id="email"
        name="email"
        label="Email"
        type="email"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.email}
      />
      <TextField
        required
        margin="dense"
        id="phone"
        name="phone"
        label="Phone"
        type="tel"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.phone}
      />
    </DialogContent>
  );
}

export default CustomerDialogContent;
