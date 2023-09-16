const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: String,
  email: { type: String },
  password: String,
});

userSchema.plugin(uniqueValidator);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
