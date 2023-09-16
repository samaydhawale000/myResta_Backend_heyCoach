const express = require("express");
const userModel = require("../models/userModel");
const userMiddleware = require("../middleware/userMiddleware");
const userRoute = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const loginMiddleware = require("../middleware/loginMiddleware");

userRoute.post("/", userMiddleware, async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 5, async (err, hash) => {
      if (hash) {
        await userModel.create({ ...req.body, password: hash });
        res.status(201).json({ status: "Success", data: req.body });
      } else {
        res.send(err.message);
      }
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

userRoute.post("/login", loginMiddleware, async (req, res) => {
  try {
    const data = await userModel.findOne({ email: req.body.email });
    if (data.email) {
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        console.log(data.password);
        if (result) {
          var token = jwt.sign({ userID: data._id }, "shhhhh");
          res.json({ status: "Success", token: token });
        } else {
          res.json({ status: "Wrong Password" });
        }
      });
    } else {
      res.json({ status: "Wrong Email" });
    }
  } catch (err) {
    res.json({ status: "failed", message: err.message });
  }
});

module.exports = userRoute;
