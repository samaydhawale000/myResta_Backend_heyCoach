function userMiddleware(req, res, next) {
  if (req.body.username && req.body.email && req.body.password) {
    next();
  } else {
    res.status(500).json({ msg: "All fields are required" });
  }
}

module.exports = userMiddleware;
