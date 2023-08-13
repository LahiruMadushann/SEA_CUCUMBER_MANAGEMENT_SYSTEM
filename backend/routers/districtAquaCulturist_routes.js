const router = require("express").Router();
const districtAquaCulturistController = require("../controller/districtAquaCulturist_controller");
const userController = require("../controller/user_controller");

router.post(
  "/districtAquaCulturist/insertFarmingDetails",
  districtAquaCulturistController.insertFarmingDetails
);

router.put(
  "/districtAquaCulturist/updateFarmDetails",
  districtAquaCulturistController.updateFarm
);

router.get(
  "/districtAquaCulturist/getAllAquaFarmDetails",
  districtAquaCulturistController.getAllAquaFarmDetails
);

router.post(
  "/districtAquaCulturist/createAdvertisement",
  districtAquaCulturistController.createAdvertisement
);

router.delete("/districtAquaCulturist/delete", userController.deleteUser);

router.post(
  "/districtAquaCulturist/changePassword",
  userController.changePassword
);

module.exports = router;
