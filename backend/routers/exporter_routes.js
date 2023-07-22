const router = require("express").Router();
const exporterController = require("../controller/exporter_controller");

router.post("/exporter/register", exporterController.registerExporter);

router.put("/exporter/update", exporterController.updateExporter);

router.delete("/exporter/delete", exporterController.deleteExporter);

router.get(
  "/exporter/getAquaFarmDetails",
  exporterController.getAquaFarmDetails
);

router.get(
  "/exporter/getIndividualFarmDetails",
  exporterController.getIndividualAquaFarmDetails
);

module.exports = router;
