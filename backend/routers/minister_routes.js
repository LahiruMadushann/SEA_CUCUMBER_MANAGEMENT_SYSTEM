const router = require("express").Router();
const ministerController = require("../controller/minister_controller");

router.put("/minister/update", ministerController.updateMinister);

router.delete("/minister/delete", ministerController.deleteMinister);

router.post("/minister/changePassword", ministerController.changePassword);

router.post("/minister/enterNews", ministerController.enterNews);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
