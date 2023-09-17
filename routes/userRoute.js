const express = require("express");
const userModel = require("../models/userModel");
const userMiddleware = require("../middleware/userMiddleware");
const userRoute = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const loginMiddleware = require("../middleware/loginMiddleware");
const pool = require("../db");

userRoute.post("/", userMiddleware, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(
      sql,
      [req.body.username, req.body.email, req.body.password],
      (err, result) => {
        connection.release();
        if (err) {
          res.json({ error: err.message });
        }
        res.json({ status: "Success", data: "User Register successfully" });
      }
    );
  });
});

userRoute.post("/login", loginMiddleware, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";

    connection.query(sql, [req.body.email], (err, result) => {
      connection.release();
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
    });
  });
});

userRoute.get("/", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = "SELECT * FROM users";

    connection.query(sql, (err, result) => {
      connection.release();

      if (err) {
        res.json({ error: err.message });
      }
      res.json({ status: "Success", data: result });
    });
  });
});

module.exports = userRoute;
