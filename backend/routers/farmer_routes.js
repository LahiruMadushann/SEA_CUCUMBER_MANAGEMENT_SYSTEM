const router = require("express").Router();
const farmerController = require("../controller/farmer_controller");

router.post("/farmer/register", farmerController.registerFarmer);

router.get("/farmer/getAquaFarmDetails", farmerController.getAquaFarmDetails);

router.get("/farmer/getAquaFarmNews", farmerController.getAquaFarmNews);

module.exports = router;
