import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";


function DsrTable() {
  const [salesData, setSalesData] = useState([]);
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling behavior
    });
  };

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5002/fetchdsr")
      .then((res) => setSalesData(res.data));
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#eb922c",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#d5a2673d",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


  const [filteredSalesData, setFilteredSalesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5002/fetchdsr").then((res) => {
      setSalesData(res.data);
      setFilteredSalesData(res.data); //  filtered data with all sales data
    });
  }, []);

  useEffect(() => {
    // Filter sales data based on search query
    if (searchQuery.trim() === "") {
      setFilteredSalesData(salesData); // Reset to show all data if search query is empty
    } else {
      const filteredData = salesData.filter((row) =>
        row.dsr_id.toString().includes(searchQuery.trim())
      );
      setFilteredSalesData(filteredData);
    }
  }, [searchQuery, salesData]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="background">
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />

        <Container
          className="table-container"
          sx={{ margin: 0, padding: 0, maxWidth: "100%" }}
        >
          <div id="main">
            <Typography variant="h4" align="center" gutterBottom>
              Sales Data
            </Typography>
            <div className="Search">
              <Stack spacing={4}>
                <Stack spacing={5} direction={"row"}>
                  <TextField
                    style={{ width: "224px" }}
                    label="Search by DSR ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />

                  <Button
                    variant="contained"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    component={Link}
                    to="/dsr"
                  >
                    {" "}
                    Add{" "}
                  </Button>
                </Stack>
              </Stack>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="outlined"
                sx={{ margin: "10px 10px 10px 10px" }}
                onClick={() => {
                  handleHorizantalScroll(elementRef.current, 20, 305, -10);
                }}
                disabled={arrowDisable}
              >
                <FaArrowLeft />
              </Button>
              <Button
                sx={{ margin: "10px 10px 10px 0px" }}
                variant="outlined"
                onClick={() => {
                  handleHorizantalScroll(elementRef.current, 20, 305, 10);
                }}
              >
                <FaArrowRight />
              </Button>
            </div>

            <TableContainer component={Paper} ref={elementRef}>
              <Table>
                <TableHead
                  sx={{
                    ".MuiTableCell-root": { fontWeight: "600" },
                  }}
                >
                  <TableRow>
                    <StyledTableCell>S.NO</StyledTableCell>
                    <StyledTableCell>Register_Date</StyledTableCell>
                    <StyledTableCell>Time</StyledTableCell>
                    <StyledTableCell>Company_Name</StyledTableCell>
                    <StyledTableCell>Company_Address</StyledTableCell>
                    <StyledTableCell>Company_Phone</StyledTableCell>
                    <StyledTableCell>Lead_Status</StyledTableCell>
                    <StyledTableCell>Follow_Up_Date</StyledTableCell>
                    <StyledTableCell>Sales_Type</StyledTableCell>
                    <StyledTableCell>Products_Pitched</StyledTableCell>
                    <StyledTableCell>Products_Sold</StyledTableCell>
                    <StyledTableCell>Price_Quoted</StyledTableCell>
                    <StyledTableCell>Sale_Amount</StyledTableCell>
                    <StyledTableCell>Clearance_Amount</StyledTableCell>
                    <StyledTableCell>Contract_Signed_Date</StyledTableCell>
                    <StyledTableCell>Client_Name</StyledTableCell>
                    <StyledTableCell>Client_Phone_Number</StyledTableCell>
                    <StyledTableCell>Client_Email</StyledTableCell>
                    <StyledTableCell>Notes</StyledTableCell>
                    <StyledTableCell>Month</StyledTableCell>
                    <StyledTableCell>Month_Year</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSalesData.map((row) => (
                    <StyledTableRow key={row.dsr_id}>
                      <StyledTableCell>{row.dsr_id}</StyledTableCell>
                      <StyledTableCell>
                        {format(new Date(row.date), "dd-MM-yyyy")}
                      </StyledTableCell>
                      <StyledTableCell>{row.time}</StyledTableCell>
                      <StyledTableCell>{row.company_name}</StyledTableCell>
                      <StyledTableCell>{row.company_address}</StyledTableCell>
                      <StyledTableCell>{row.company_phone}</StyledTableCell>
                      <StyledTableCell>{row.lead_status}</StyledTableCell>
                      <StyledTableCell>
                        {format(new Date(row.follow_up_date), "dd-MM-yyyy")}
                      </StyledTableCell>
                      <StyledTableCell>{row.sales_type}</StyledTableCell>
                      <StyledTableCell>{row.products_picthed}</StyledTableCell>
                      <StyledTableCell>{row.products_sold}</StyledTableCell>
                      <StyledTableCell>{row.price_quoted}</StyledTableCell>
                      <StyledTableCell>{row.sale_amount}</StyledTableCell>
                      <StyledTableCell>{row.clearance_amount}</StyledTableCell>
                      <StyledTableCell>
                        {format(
                          new Date(row.contract_signed_date),
                          "dd-MM-yyyy"
                        )}
                      </StyledTableCell>
                      <StyledTableCell>{row.client_name}</StyledTableCell>
                      <StyledTableCell>
                        {row.client_phone_number}
                      </StyledTableCell>
                      <StyledTableCell>{row.client_email}</StyledTableCell>
                      <StyledTableCell>{row.notes}</StyledTableCell>
                      <StyledTableCell>{row.month}</StyledTableCell>
                      <StyledTableCell>{row.month_year}</StyledTableCell>

                      <StyledTableCell>
                        <button>
                          <Link to={`/DsrUpdate/${row.dsr_id}`}>
                            {" "}
                            <EditCalendarIcon />
                          </Link>
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleScrollToTop}
          >
            Scroll To Top
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default DsrTable;
