const mysql = require("mysql");

const newCon = mysql.createConnection({
  connectionLimit: 10,
  host: "10.101.10.186",
  user: "root",
  password: "",
  database: "restaurant_backend",
});

module.exports = newCon;
