const db = require("./database/dbconnect");
const express = require("express");
const cors = require("cors");
const Login = require("./Routes/Login");
const dsrRouter=require("./Routes/DsrSale");

const app = express();
// const dsrRouter = express.Router();

app.use(express.json());
app.use(cors());

// app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed HTTP methods
  credentials: true, // Enable credentials (cookies, authorization headers)
};


//POST LOGIN ROUTE
app.use("/login", Login);

//Post DSR 
app.use("/sales", dsrRouter);

//GET LOGIN ROUTE
app.get("/login", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

//Get dsr details
app.get("/fetchdsr", (req, res) => {
  const sql = "SELECT * FROM dsr";
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

// Update operation for order_task based on bid
dsrRouter.put("/:dsr_id", (req, res) => {
  const dsr_id = req.params.dsr_id;

  const updateSql =
    "UPDATE dsr SET `date`=?, `time`=?, `company_name`=?, `company_address`=?, `company_phone`=?, `lead_status`=?, `follow_up_date`=?, `sales_type`=?, `products_picthed`=?, `products_sold`=?, `price_quoted`=?, `sale_amount`=?, `clearance_amount`=? ,`contract_signed_date`=?,`client_name`=?,`client_phone_number`=?,`client_email`=?,`notes`=?,`month`=?,`month_year`=?  WHERE `dsr_id`=?";

  const {
    date,
    time,
    company_name,
    company_address,
    company_phone,
    lead_status,
    follow_up_date,
    sales_type,
    products_picthed,
    products_sold,
    price_quoted,
    sale_amount,
    clearance_amount,
    contract_signed_date,
    client_name,
    client_phone_number,
    client_email,
    notes,
    month,
    month_year,
  } = req.body;

  const params = [
    date,
    time,
    company_name,
    company_address,
    company_phone,
    lead_status,
    follow_up_date,
    sales_type,
    products_picthed,
    products_sold,
    price_quoted,
    sale_amount,
    clearance_amount,
    contract_signed_date,
    client_name,
    client_phone_number,
    client_email,
    notes,
    month,
    month_year,
    dsr_id,
  ];

  console.log("Update Parameters:", params);

  db.query(updateSql, params, (err, data) => {
    if (err) {
      console.error("Error updating order task:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Data updated:", data);
    return res.status(200).json(data);
  });
});





app.listen(5002, () => {
  console.log("Server is running on 5002");
});
