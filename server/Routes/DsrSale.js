const express = require('express');
const dsrRouter = express.Router();
const db = require('../database/dbconnect');


dsrRouter.post('/',(req,res) =>{
    const sql = `INSERT INTO dsr(date,time,company_name,company_address,company_phone,lead_status,follow_up_date,sales_type,products_picthed,products_sold,price_quoted,sale_amount,clearance_amount,contract_signed_date,client_name,client_phone_number,client_email,notes,month,month_year) VALUES (?)`;

    const values = [
        req.body.date,
        req.body.time,
        req.body.company_name,
        req.body.company_address,
        req.body.company_phone,
        req.body.lead_status,
        req.body.follow_up_date,
        req.body.sales_type,
        req.body.products_picthed,
        req.body.products_sold,
        req.body.price_quoted,
        req.body.sale_amount,
        req.body.clearance_amount,
        req.body.contract_signed_date,
        req.body.client_name,
        req.body.client_phone_number,
        req.body.client_email,
        req.body.notes,
        req.body.month,
        req.body.month_year   
    ]

    console.log("Inserting data into 'dsr' table:", values);

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: "An error occurred while inserting data" });
        } else {
            console.log("Data inserted successfully");
            res.json({ message: "Data inserted successfully" });
        }
    });
    
})



dsrRouter.get("/fetchdsr", (req, res) => {
  const sql = "SELECT * FROM dsr";
  db.query(sql, (err, data) => {
    res.json(data);
  });
});


// GET endpoint to fetch sales data by ID
dsrRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM dsr WHERE dsr_id = ?`;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "An error occurred while fetching data" });
    } else {
      if (data.length === 1) {
        res.json(data[0]);
      } else {
        res.status(404).json({ error: "Data not found" });
      }
    }
  });
});






module.exports = dsrRouter;