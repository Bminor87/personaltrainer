import { useState } from "react";
import Button from "@mui/material/Button";
import AlertDialog from "./AlertDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "../../services/customers-service";

export default function DeleteCustomerButton({ currentCustomer }) {
  const [open, setOpen] = useState(false);
  const customer = currentCustomer;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: queryClient.invalidateQueries("customers"),
  });

  const handleConfirm = () => {
    deleteMutation.mutate(customer._links.self.href);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        title="Delete?"
        message={`Are you sure you want to delete ${customer.firstname} ${customer.lastname}?`}
      />
    </>
  );
}
