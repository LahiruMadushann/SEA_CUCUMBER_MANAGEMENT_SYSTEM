const router = require("express").Router();
const exporterController = require("../controller/exporter_controller");
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

router.post(
  "/exporter/register",
  imageMiddleware.single("profilePic"),
  exporterController.registerExporter
);

router.put("/exporter/update", exporterController.updateExporter);

router.delete("/exporter/delete", userController.deleteUser);

router.post("/exporter/changePassword", userController.changePassword);

router.get(
  "/exporter/getAquaFarmDetails",
  exporterController.getAquaFarmDetails
);

router.get(
  "/exporter/getFishProcessorsDetails",
  exporterController.getFishProcessorsDetails
);

router.get(
  "/exporter/getIndividualFishProcessorDetails",
  exporterController.getIndividualFishProcessorsDetails
);

module.exports = router;
