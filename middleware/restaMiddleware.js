function restaMiddleware(req,res, next){
    if ( req.body.name && req.body.address && req.body.image && req.body.contact) {
        next();
      } else {
        res.status(500).json({ msg: "All fields are required" });
      }
}

module.exports = restaMiddleware