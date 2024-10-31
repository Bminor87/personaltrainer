import { Button } from "@mui/material";
import { reset } from "../../services/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function ResetButton() {
  const queryClient = useQueryClient();

  const resetApi = async () => {
    reset();
    queryClient.invalidateQueries("customers");
    queryClient.invalidateQueries("trainings");
  };

  return (
    <Button color="inherit" onClick={resetApi}>
      Reset API
    </Button>
  );
}
