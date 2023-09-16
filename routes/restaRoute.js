const express = require("express");
const restaMiddleware = require("../middleware/restaMiddleware");
const restaModel = require("../models/restaModel");
const authMiddleware = require("../middleware/authMiddleware");
const restaRoute = express.Router();
var jwt = require("jsonwebtoken");


restaRoute.post("/add", restaMiddleware, async (req, res) => {
  try {
    
      await restaModel.create({ ...req.body, userID: decoded.userID });
      res.status(201).json({ status: "Success", data: req.body });
    
  } catch (err) {
    res.json({ status: "fail", message: err.message });
  }
});

// authorization need to do here

restaRoute.get("/", async (req, res) => {
  try {
      let data = await restaModel.find({ userID: decoded.userID });
      res.status(201).json({ status: "Success", data: data });
  } catch (err) {
    res.json({ status: "fail", message: err.message });
  }
});

restaRoute.put("/update/:id", async (req, res) => {
  try {
    await restaModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(201).json({ status: "Success", data: req.body });
  } catch (err) {
    res.json({ status: "fail", message: err.message });
  }
});

restaRoute.delete("/deleteRestaurant/:id", async (req, res) => {
  try {
    await restaModel.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({ status: "Success", message: "Restaurant Deleted" });
  } catch (err) {
    res.json({ status: "fail", message: err.message });
  }
});

module.exports = restaRoute;
