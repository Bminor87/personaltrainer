import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, Toolbar, AppBar, Typography } from "@mui/material";

import PersonalTrainerApp from "./components/PersonalTrainerApp";
import CustomersPage from "./components/CustomersPage";
import './App.css'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="xl">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Personal Trainer</Typography>
          </Toolbar>
        </AppBar>
        <CustomersPage />
      </Container>
    </QueryClientProvider>
  )
}

export default App
