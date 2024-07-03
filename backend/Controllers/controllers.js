const Fact = require("../models/model");

async function getfacts(req, res) {
  try {
    const fact = await Fact.find();
    res.json(fact);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}

module.exports = { getfacts };
