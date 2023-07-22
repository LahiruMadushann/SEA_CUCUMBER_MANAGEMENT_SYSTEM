const router = require("express").Router();
const exporterController = require("../controller/exporter_controller");

router.post("/farmer/register", exporterController.registerExporter);

// router.put("/exporter/update", exporterController.updateExporter);

// router.delete("/exporter/delete", exporterController.deleteExporter);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
