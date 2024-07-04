const {
  getfacts,
  incrementlikes,
  incrementmindemoji,
  incrementfalsecount,
  postfact,
} = require("../Controllers/controllers");
const router = require("express").Router();

router.get("/getfacts", getfacts);
router.put("/incrementlikes/:id", incrementlikes);
router.put("/incrementmindemoji/:id", incrementmindemoji);
router.put("/incrementfalsecount/:id", incrementfalsecount);
router.post("/postfact", postfact);
module.exports = router;
