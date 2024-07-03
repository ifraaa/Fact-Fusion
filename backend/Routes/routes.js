const { getfacts } = require("../Controllers/controllers");
const router = require("express").Router();

router.get("/getfacts", getfacts);

module.exports = router;
