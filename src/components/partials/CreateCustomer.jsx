import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "../../services/customers-service";
import CustomerDialogContent from "./CustomerDialogContent";

export default function CreateCustomer() {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    resetCustomer();
  }, []);

  const resetCustomer = () => {
    setCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: queryClient.invalidateQueries("customers"),
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Customer</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            console.log("CUSTOMER BEING CREATED: ", customer);
            createMutation.mutate(customer);
            setOpen(false);
            resetCustomer();
          },
        }}
      >
        <DialogTitle>Create Customer</DialogTitle>
        <CustomerDialogContent
          customer={customer}
          handleChange={handleChange}
        />
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
