import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createTraining } from "../../services/trainings-service";
import TrainingDialogContent from "./TrainingDialogContent";

import { getCustomers } from "../../services/customers-service";

export default function CreateTraining() {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({});

  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  useEffect(() => {
    resetTraining();
  }, []);

  const resetTraining = () => {
    setTraining({
      date: "",
      duration: "",
      activity: "",
      customer: "",
    });
  };

  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTraining,
    onSuccess: queryClient.invalidateQueries("trainings"),
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Training</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            console.log("Training BEING CREATED: ", training);
            createMutation.mutate(training);
            setOpen(false);
            resetTraining();
          },
        }}
      >
        <DialogTitle>Create Training</DialogTitle>
        <TrainingDialogContent
          training={training}
          handleChange={handleChange}
          customers={customers}
        />
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
