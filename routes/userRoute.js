const express = require("express");
const userModel = require("../models/userModel");
const userMiddleware = require("../middleware/userMiddleware");
const userRoute = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const loginMiddleware = require("../middleware/loginMiddleware");
const newCon = require("../db");

userRoute.post("/", userMiddleware, (req, res) => {
  newCon.connect((err) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    newCon.query(
      sql,
      [req.body.username, req.body.email, req.body.password],
      (err, result) => {
        if (err) {
          res.json({ error: err.message });
        } else {
          res.json({ status: "Success", data: "User Register successfully" });
        }
      }
    );
    newCon.end((err) => {
      if (err) {
        console.error("Error closing the database connection:", err);
      } else {
        console.log("Connection closed");
      }
    });
  });
});

userRoute.post("/login", loginMiddleware, (req, res) => {
  newCon.connect((err) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = "SELECT * FROM users WHERE email = ? LIMIT 1";

    newCon.query(sql, [req.body.email], (err, result) => {
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
    newCon.end((err) => {
      if (err) {
        console.error("Error closing the database connection:", err);
      } else {
        console.log("Connection closed");
      }
    });
  });
});

userRoute.get("/", async (req, res) => {
  newCon.connect((err) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = "SELECT * FROM users";

    newCon.query(sql, (err, result) => {
      if (err) {
        res.json({ error: err.message });
      } else {
        res.json({ status: "Success", data: result });
      }
    });
    newCon.end((err) => {
      if (err) {
        console.error("Error closing the database connection:", err);
      } else {
        console.log("Connection closed");
      }
    });
  });
});

module.exports = userRoute;
