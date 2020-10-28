const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, keys.secretOrKey, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must logged in" });
    }

    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
