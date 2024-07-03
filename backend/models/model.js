const mongoose = require("mongoose");
const factSchema = new mongoose.Schema({
  fact: String,
  source: String,
  likeCount: Number,
  mindBlownCount: Number,
  falseCount: Number,
  category: String,
});
const fact = mongoose.model("Fact", factSchema);
module.exports = fact;
