const router = require("express").Router();
const exporterController = require("../controller/exporter_controller");

router.post("/exporter/register", exporterController.registerExporter);

router.put("/exporter/update", exporterController.updateExporter);

router.get(
  "/exporter/getAquaFarmDetails",
  exporterController.getAquaFarmDetails
);

module.exports = router;
