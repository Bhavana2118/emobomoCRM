import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import HRDashboard from "./Pages/HRDashboard"
import SHDashboard from "./Pages/SHDashboard"
import EmployeeDashboard from "./Pages/EmployeeDashboard"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DsrTable from "./Pages/DsrTable";
import DsrUpdate from "./Pages/DsrUpadate";
import DashBoard from "./Pages/Dashboard";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 860,
      lg: 1050, // Change the width at the lg breakpoint
      xl: 1400,
    },
  },
});


function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dsr" element={<AdminDashboard />} />
            <Route path="/DsrUpdate/:dsr_id" element={<DsrUpdate />} />
            <Route path="/dsrTable" element={<DsrTable />} />
            <Route path="/HRDashboard" element={<HRDashboard />} />
            <Route path="/SHDashboard" element={<SHDashboard />} />
            <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
            <Route path="/Dashboard" element={<DashBoard />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
