const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = mongoose.connect(process.env.DATABASE_URl);

module.exports = dbConnect;
