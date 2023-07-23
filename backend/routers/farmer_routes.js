const router = require("express").Router();
const farmerController = require("../controller/farmer_controller");

router.post("/farmer/register", farmerController.registerFarmer);

router.get("/farmer/getAquaFarmDetails", farmerController.getAquaFarmDetails);
// router.put("/exporter/update", exporterController.updateExporter);

// router.delete("/exporter/delete", exporterController.deleteExporter);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
