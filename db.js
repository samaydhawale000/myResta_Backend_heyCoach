const mysql = require("mysql");

const con = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant_backend",
});

module.exports = con;
