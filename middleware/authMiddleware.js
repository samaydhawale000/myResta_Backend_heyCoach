function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(500).json({ message: "You are not authenticate, Please Login" });
  }
}

module.exports = authMiddleware;
