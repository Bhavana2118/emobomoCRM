import React, { useState,useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "../ComponentsCSS/AdminDashboard.css";
import MaskedInput from "react-text-mask";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function MonthYearInput(props) {
  const { inputRef, ...other } = props;

  // Custom input mask for month and year (MM/YYYY)
  const mask = [/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

  return (
    <MaskedInput
      {...other}
      inputRef={inputRef} // Use inputRef directly here
      mask={mask}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

function AdminDashboard(props) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    company_name: "",
    company_address: "",
    company_phone: "",
    lead_status: "",
    follow_up_date: "",
    sales_type: "",
    products_picthed: "",
    products_sold: "",
    price_quoted: "",
    sale_amount: "",
    clearance_amount: "",
    contract_signed_date: "",
    client_name: "",
    client_phone_number: "",
    client_email: "",
    notes: "",
    month: "",
    month_year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    axios
      .post("http://localhost:5002/sales", formData)
      .then((response) => {
        console.log(response.data);
        window.alert("successfully submitted");
        navigate("/DsrTable");
      })
      .catch((error) => {
        console.log(error);
        window.alert("Error submitting data");
      });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (time) => {
    // Assuming time is in format "hh:mm:ss" or "hh:mm"
    const [hours, minutes] = time.split(":");
    // Convert hours to 12-hour format and add AM or PM
    const ampm = parseInt(hours, 10) >= 12 ? "PM" : "AM";
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  //to get current date
  useEffect(() => {
    // Set the current date when the component mounts
    const currentDate = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format
    setFormData((prevData) => ({
      ...prevData,
      date: currentDate,
    }));
  }, []);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return (
    <div className="background">
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />

        <Container style={{ padding: 0 }}>
          <div id="main">
            <Typography variant="h4" align="center" gutterBottom>
              DSR
            </Typography>

            <form onSubmit={handleSubmit} id="form">
              <br></br>
              <Grid container spacing={3}>
                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="company_address"
                    value={formData.company_address}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="company_phone"
                    value={formData.company_phone}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Lead Status</InputLabel>
                    <Select
                      label="Lead Status"
                      name="lead_status"
                      value={formData.lead_status}
                      onChange={handleChange}
                    >
                      <MenuItem value="not_intersted">Not Intersted</MenuItem>
                      <MenuItem value="no_response">No Response </MenuItem>
                      <MenuItem value="appointment_schedule">
                        Appointment Schedule{" "}
                      </MenuItem>
                      <MenuItem value="meet_and_not_intersted">
                        Meet and Not Intersted{" "}
                      </MenuItem>
                      <MenuItem value="meet_and_hot_customer">
                        Meet and Hot Customer{" "}
                      </MenuItem>
                      <MenuItem value="meet_and_follow_up">
                        Meet and Follow Up{" "}
                      </MenuItem>
                      <MenuItem value="contract_signed_and_contract_paid">
                        Contract Signed and Contract Paid{" "}
                      </MenuItem>
                      <MenuItem value="contract_signed">
                        Contract Signed{" "}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Follow Up Date"
                    type="date"
                    name="follow_up_date"
                    value={formData.follow_up_date}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Sales Type</InputLabel>
                    <Select
                      label="Sales Type"
                      name="sales_type"
                      value={formData.sales_type}
                      onChange={handleChange}
                    >
                      <MenuItem value="new">New </MenuItem>
                      <MenuItem value="renewal"> Renewal </MenuItem>
                      <MenuItem value="balance"> Balance </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Products Pitched</InputLabel>
                    <Select
                      label="Products Pitched"
                      name="products_picthed"
                      value={formData.products_picthed}
                      onChange={handleChange}
                    >
                      <MenuItem value="professional_website">
                        Professional Website
                      </MenuItem>
                      <MenuItem value="professional_website_+_seo">
                        Professional Website + SEO
                      </MenuItem>

                      <MenuItem value="premium_website">
                        Premium Website
                      </MenuItem>
                      <MenuItem value="premium_website_+_seo">
                        Premium Website + SEO
                      </MenuItem>

                      <MenuItem value="seo_local">SEO : Local</MenuItem>
                      <MenuItem value="organic_seo">Organic SEO</MenuItem>
                      <MenuItem value="social_media_management">
                        Social Media Management
                      </MenuItem>
                      <MenuItem value="erp_application_only">
                        ERP application only
                      </MenuItem>
                      <MenuItem value="crm_application_only">
                        CRM application only
                      </MenuItem>
                      <MenuItem value="mobile_app">mobile_app</MenuItem>
                      <MenuItem value="erp_and_modile_app">
                        ERP and Mobile app
                      </MenuItem>
                      <MenuItem value="crm_and_modile_app">
                        CRM and Mobile app
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Products Sold"
                    type="number"
                    name="products_sold"
                    value={formData.products_sold}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Price Quoted"
                    type="number"
                    name="price_quoted"
                    value={formData.price_quoted}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Sales Amount"
                    type="number"
                    name="sale_amount"
                    value={formData.sale_amount}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Clearance Amount"
                    type="number"
                    name="clearance_amount"
                    value={formData.clearance_amount}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Contract Signed Date"
                    type="date"
                    name="contract_signed_date"
                    value={formData.contract_signed_date}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Client Name"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Client Phone Number"
                    type="number"
                    name="client_phone_number"
                    value={formData.client_phone_number}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Client Email"
                    type="email"
                    name="client_email"
                    value={formData.client_email}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    select
                    fullWidth
                    label="Month"
                    type="text"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    {months.map((month) => (
                      <MenuItem key={month.value} value={month.value}>
                        {month.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={11} sm={5} md={4} lg={3}>
                  <TextField
                    fullWidth
                    label="Month-Year"
                    name="month_year"
                    value={formData.month_year}
                    onChange={handleChange}
                    variant="outlined"
                    defaultValue={0}
                    InputProps={{
                      inputComponent: MonthYearInput,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <br />

                <Grid item xs={12} sm={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AdminDashboard;
