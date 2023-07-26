const router = require("express").Router();
const farmerController = require("../controller/farmer_controller");
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

router.post(
  "/farmer/register",
  imageMiddleware.single("profilepic"),
  farmerController.registerFarmer
);

router.put("/farmer/update", farmerController.updateFarmer);

router.delete("/farmer/delete", userController.deleteUser);

router.post("/farmer/changePassword", userController.changePassword);

router.get("/farmer/getAquaFarmDetails", farmerController.getAquaFarmDetails);

router.get("/farmer/getAquaFarmNews", farmerController.getAquaFarmNews);

module.exports = router;
