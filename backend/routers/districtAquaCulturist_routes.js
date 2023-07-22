const router = require("express").Router();
const districtAquaCulturistController = require("../controller/districtAquaCulturist_controller");

router.post(
  "/districtAquaCulturist/insertFarmingDetails",
  districtAquaCulturistController.insertFarmingDetails
);

module.exports = router;
