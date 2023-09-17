const express = require("express");
const userModel = require("../models/userModel");
const userMiddleware = require("../middleware/userMiddleware");
const userRoute = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const loginMiddleware = require("../middleware/loginMiddleware");
const pool = require("../db");

// Define a route-specific middleware to obtain a connection from the pool
function getConnectionFromPool(req, res, next) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error getting connection from the pool:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      req.connection = connection; // Attach the connection to the request object
      next();
    }
  });
}

userRoute.post("/", userMiddleware, getConnectionFromPool, (req, res) => {
  const connection = req.connection; // Get the connection from the request object

  let sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  connection.query(
    sql,
    [req.body.username, req.body.email, req.body.password],
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
      } else {
        res.json({ status: "Success", data: "User Register successfully" });
      }

      connection.release(); // Release the connection back to the pool
    }
  );
});

userRoute.post("/login", loginMiddleware, getConnectionFromPool, (req, res) => {
  const connection = req.connection; // Get the connection from the request object

  let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
  connection.query(sql, [req.body.email], (err, result) => {
    if (err) {
      res.json({ error: err.message });
    }
    console.log(result);
    if (result.length > 0) {
      if (result[0].password == req.body.password) {
        res.json({ status: "Success" });
      } else {
        res.json({ status: "Wrong Password" });
      }
    } else {
      res.json({ status: "Wrong Email" });
    }

    connection.release(); // Release the connection back to the pool
  });
});

userRoute.get("/", async (req, res) => {
  const connection = req.connection; // Get the connection from the request object

  let sql = "SELECT * FROM users";
  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json({ status: "Success", data: result });
    }

    connection.release(); // Release the connection back to the pool
  });
});

module.exports = userRoute;
