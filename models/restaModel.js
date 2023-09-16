const mongoose = require("mongoose");

const restaSchema = mongoose.Schema({
  name: String,
  address: String,
  contact: String,
  image: String,
  userID: String,
});

const restaModel = mongoose.model("restaurant", restaSchema);
module.exports = restaModel;
