const router = require("express").Router();
const farmerController = require("../controller/farmer_controller");

router.post("/farmer/register", farmerController.registerFarmer);

router.put("/farmer/update", farmerController.updateFarmer);

router.delete("/farmer/delete", farmerController.deleteFarmer);

router.post("/farmer/changePassword", farmerController.changePassword);

router.get("/farmer/getAquaFarmDetails", farmerController.getAquaFarmDetails);

router.get("/farmer/getAquaFarmNews", farmerController.getAquaFarmNews);

module.exports = router;
