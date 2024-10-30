import { useState, useEffect } from 'react';

import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import CustomerDialogContent from "./partials/CustomerDialogContent";
import { updateCustomer } from "../services/customers-service";

const UpdateCustomer = ({ currentCustomer }) => {
    const [customer, setCustomer] = useState(currentCustomer);

    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();
  
    const updateMutation = useMutation({
      mutationFn: updateCustomer,
      onSuccess: queryClient.invalidateQueries("customers"),
    });
  
    const handleChange = (event) => {
      setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Edit</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                component: "form",
                onSubmit: (event) => {
                    event.preventDefault();
                    console.log("CUSTOMER BEING UPDATED: ", customer);
                    updateMutation.mutate(customer);
                    setOpen(false);
                },
                }}
            >
                <DialogTitle>Update Customer</DialogTitle>
                <CustomerDialogContent customer={customer} handleChange={handleChange} />
                <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateCustomer;