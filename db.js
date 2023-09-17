const mysql = require("mysql");

const newCon = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "resta_heycoach_backend",
});

module.exports = newCon;
