const router = require("express").Router();
const farmDashboardController = require("../controller/farmDashboard_controller");

router.get(
  "/farmdashboard/getAquaFarmDetails",
  farmDashboardController.getAllFarmDetails
);

router.get(
  "/farmdashboard/getAllFarmersDetails",
  farmDashboardController.getAllFarmersDetails
);

module.exports = router;
