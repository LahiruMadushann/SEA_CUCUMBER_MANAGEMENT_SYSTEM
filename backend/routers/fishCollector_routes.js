const router = require("express").Router();
const fishCollectorController = require("../controller/fishCollector_controller");

router.post(
  "/fishCollector/register",
  fishCollectorController.registerFishCollector
);

router.put(
  "/fishCollector/update",
  fishCollectorController.updateFishCollector
);

router.delete(
  "/fishCollector/delete",
  fishCollectorController.deleteFishCollector
);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
