const Fact = require("../models/model");

async function getfacts(req, res) {
  try {
    const fact = await Fact.find();
    res.json(fact);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}
async function incrementlikes(req, res) {
  try {
    const fact_id = req.params.id;
    const fact = await Fact.findById(fact_id);

    if (!fact) {
      return res.status(404).json("Fact not found");
    }

    fact.likeCount += 1;
    await fact.save();

    res.json(fact);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}

async function incrementmindemoji(req, res) {
  try {
    const fact_id = req.params.id;
    const fact = await Fact.findById(fact_id);

    if (!fact) {
      return res.status(404).json("Fact not found");
    }

    fact.mindBlownCount += 1;
    await fact.save();

    res.json(fact);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}

async function incrementfalsecount(req, res) {
  try {
    const fact_id = req.params.id;
    const fact = await Fact.findById(fact_id);

    if (!fact) {
      return res.status(404).json("Fact not found");
    }

    fact.falseCount += 1;
    await fact.save();

    res.json(fact);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}

async function postfact(req, res) {
  try {
    const newFact = new Fact({
      fact: req.body.fact,
      source: req.body.source,
      category: req.body.category,
      likeCount: req.body.likeCount,
      mindBlownCount: req.body.mindBlownCount,
      falseCount: req.body.falseCount,
    });
    const savedFact = await newFact.save();
    res.json("Fact posted successfully");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
}

module.exports = {
  getfacts,
  incrementlikes,
  incrementmindemoji,
  incrementfalsecount,
  postfact,
};
