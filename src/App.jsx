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

import FlyoutMenu from "./components/tailwind/FlyoutMenu";

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
                <Typography variant="h5" component={Link} to="/">
                  Personal Trainer
                </Typography>
                <FlyoutMenu />
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
