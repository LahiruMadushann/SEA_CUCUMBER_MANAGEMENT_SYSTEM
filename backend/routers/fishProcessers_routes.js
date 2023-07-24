const router = require("express").Router();
const fishProcesserController = require("../controller/fishProcesser_controller");
const userController = require("../controller/user_controller");
router.post(
  "/fishProcessers/register",
  fishProcesserController.registerFishProcesser
);

router.put(
  "/fishProcessers/update",
  fishProcesserController.updateFishProcesser
);

router.delete("/fishProcessers/delete", userController.deleteUser);

router.post("/fishProcessers/changePassword", userController.changePassword);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
