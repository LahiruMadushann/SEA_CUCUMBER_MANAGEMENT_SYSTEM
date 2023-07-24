const router = require("express").Router();
const ministerController = require("../controller/minister_controller");
const userController = require("../controller/user_controller");

router.put("/minister/update", ministerController.updateMinister);

router.delete("/minister/delete", userController.deleteUser);

router.post("/minister/changePassword", userController.changePassword);

router.post("/minister/enterNews", ministerController.enterNews);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
