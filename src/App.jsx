import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Container,
  Toolbar,
  AppBar,
  Typography,
  Button,
  CssBaseline,
  Grid2,
  Box,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import PersonalTrainerApp from "./components/PersonalTrainerApp";
import CustomersPage from "./components/CustomersPage";
import TrainingsPage from "./components/TrainingsPage";
import CalendarPage from "./components/CalendarPage";
import ResetButton from "./components/partials/ResetButton";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <CssBaseline />
          <Container maxWidth="xl">
            <AppBar position="sticky" color="success">
              <Toolbar>
                <Grid2 direction="row" container={true}>
                  <Typography variant="h5" component={Link} to="/">
                    Personal Trainer
                  </Typography>
                  <Box display="flex" marginLeft="40px">
                    <Button color="inherit" component={Link} to="/customers">
                      Customers
                    </Button>
                    <Button color="inherit" component={Link} to="/trainings">
                      Trainings
                    </Button>
                    <Button color="inherit" component={Link} to="/calendar">
                      Calendar
                    </Button>
                  </Box>
                  <Box display="flex" marginLeft="40px">
                    <ResetButton />
                  </Box>
                </Grid2>
              </Toolbar>
            </AppBar>

            <Routes>
              <Route path="/" element={<PersonalTrainerApp />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/trainings" element={<TrainingsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </Container>
        </Router>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
