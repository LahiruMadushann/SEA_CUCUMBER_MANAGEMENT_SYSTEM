const router = require("express").Router();
const districtAquaCulturistController = require("../controller/districtAquaCulturist_controller");

router.post(
  "/districtAquaCulturist/insertFarmingDetails",
  districtAquaCulturistController.insertFarmingDetails
);

router.put(
  "/districtAquaCulturist/updateFarmDetails",
  districtAquaCulturistController.updateFarm
);

module.exports = router;
