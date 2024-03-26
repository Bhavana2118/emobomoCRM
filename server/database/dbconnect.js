const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'emobomo_crm',
    timezone:'UTC',
    port: 3306,
})

module.exports = db;