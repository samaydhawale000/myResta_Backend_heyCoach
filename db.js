const mysql = require("mysql");

const newCon = mysql.createConnection({
  connectionLimit: 10,
  host: "https://cautious-red-flannel-nightgown.cyclic.cloud",
  user: "root",
  password: "",
  database: "restaurant_backend",
});

module.exports = newCon;
