import { Button } from '@mui/material';
import { reset } from '../../services/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';

function ResetButton() {

  const queryClient = useQueryClient();

  const resetApi = async () => {
    reset();
    queryClient.invalidateQueries('customers');
  }

  return (
    <Button onClick={resetApi}>Reset API</Button>
  );
}

export default ResetButton;