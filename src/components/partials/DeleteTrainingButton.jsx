import { useState } from "react";
import Button from "@mui/material/Button";
import AlertDialog from "./AlertDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTraining } from "../../services/trainings-service";

export default function DeleteTrainingButton({ currentTraining }) {
  const [open, setOpen] = useState(false);
  const training = currentTraining;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTraining,
    onSuccess: queryClient.invalidateQueries("trainings"),
  });

  const handleConfirm = () => {
    deleteMutation.mutate(training._links.self.href);
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
        message={`Are you sure you want to delete this training?`}
      />
    </>
  );
}
