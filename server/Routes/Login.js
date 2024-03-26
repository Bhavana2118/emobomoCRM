const express = require('express');
const Login = express.Router();
const db = require('../database/dbconnect');

const jwt = require('jsonwebtoken');



Login.post('/', (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ Message: "Server Side Error" });
        if (data.length > 0) {
            const user = data[0];
            const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, "any-key", { expiresIn: "1d" });
            res.cookie("token", token);
            return res.json({ Status: "Success", data: { name: user.name, role: user.role } }); // Include user role in response
        } else {
            return res.json({ Message: "No Records Existed" });
        }
    })
})
 

module.exports = Login;