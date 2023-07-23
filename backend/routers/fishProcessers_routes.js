const router = require("express").Router();
const fishProcesserController = require("../controller/fishProcesser_controller");

router.post(
  "/fishProcessers/register",
  fishProcesserController.registerFishProcesser
);

router.put(
  "/fishProcessers/update",
  fishProcesserController.updateFishProcesser
);

router.delete(
  "/fishProcessers/delete",
  fishProcesserController.deleteFishProcesser
);

router.post(
  "/fishProcessers/changePassword",
  fishProcesserController.changePassword
);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
