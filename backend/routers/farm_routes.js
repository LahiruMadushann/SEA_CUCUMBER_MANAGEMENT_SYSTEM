const router = require("express").Router();
const farmController = require("../controller/farm_controller");

router.post("/farm/registration", farmController.register);

router.post("/farm/insertFarmingDetails", farmController.insertFarmingDetails);

module.exports = router;
