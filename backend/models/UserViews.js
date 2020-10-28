const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserViewsSchema = new Schema({
  counter: {
    type: Number,
  },
});

module.exports = UserViews = mongoose.model("UserViews", UserViewsSchema);
