const express = require("express");
const dbConnect = require("./db");
const userRoute = require("./routes/userRoute");
const app = express();
const bcrypt = require("bcrypt");
const restaRoute = require("./routes/restaRoute");
var cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/resta", restaRoute);

app.get("/", (req, res) => {
  res.send("MyRestaApp Backend");
});

app.listen(8080, async () => {
  try {
    await dbConnect;
    console.log("DB connected Successfully");
    console.log("backend is running on 8080");
  } catch (err) {
    console.log(err);
  }
});
