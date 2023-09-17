const express = require("express");
const restaMiddleware = require("../middleware/restaMiddleware");
const restaModel = require("../models/restaModel");
const authMiddleware = require("../middleware/authMiddleware");
const restaRoute = express.Router();
var jwt = require("jsonwebtoken");
const newCon = require("../db");

restaRoute.post("/add", restaMiddleware, async (req, res) => {
  newCon.connect((err) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql =
      "INSERT INTO restaurant (name, contact, address,image,added_by) VALUES (?, ?, ?,?,?)";
    newCon.query(
      sql,
      [
        req.body.name,
        req.body.contact,
        req.body.address,
        req.body.image,
        req.body.added_by,
      ],
      (err, result) => {
        if (err) {
          res.json({ error: err.message });
        } else {
          res.json({
            status: "Success",
            data: "Restaurant added successfully",
          });
        }
      }
    );
  });
});

restaRoute.get("/", (req, res) => {
  newCon.connect((err) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = "SELECT * FROM restaurant";

    newCon.query(sql, (err, result) => {
      if (err) {
        res.json({ error: err.message });
      } else {
        res.status(201).json({ status: "Success", data: result });
      }
    });
  });
});

restaRoute.put("/update/:id", async (req, res) => {
  newCon.connect((err) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = `UPDATE restaurant  SET ? WHERE id = ?`;
    newCon.query(sql, [req.body, req.params.id], (err, result) => {
      if (err) {
        res.json({ status: "fail", message: err.message });
      } else {
        res.status(201).json({ status: "Success", data: req.body });
      }
    });
  });
});

restaRoute.delete("/deleteRestaurant/:id", async (req, res) => {
  newCon.connect((err) => {
    if (err) {
      console.log("error from DB connection", err);
    }
    console.log("DB connected");

    let sql = `DELETE FROM restaurant WHERE id = ?`;
    newCon.query(sql, [req.params.id], (err, result) => {
      if (err) {
        res.json({ status: "fail", message: err.message });
      } else {
        res
          .status(201)
          .json({ status: "Success", message: "Restaurant Deleted" });
      }
    });
  });
});

module.exports = restaRoute;
