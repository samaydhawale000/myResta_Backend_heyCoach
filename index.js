const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();
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
    console.log("backend is running on 8080");
  } catch (err) {
    console.log(err);
  }
});
