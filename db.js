const mysql = require("mysql");

const newCon = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant_backend",
});

module.exports = newCon;
