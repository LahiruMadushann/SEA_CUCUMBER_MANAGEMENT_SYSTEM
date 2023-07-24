const router = require("express").Router();
const ministerController = require("../controller/minister_controller");
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

router.put("/minister/update", ministerController.updateMinister);

router.delete("/minister/delete", userController.deleteUser);

router.post("/minister/changePassword", userController.changePassword);

router.post("/minister/enterNews", ministerController.enterNews);

router.post(
  "/image/uploadImage",
  imageMiddleware.single("image"),
  userController.uploadImage
);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
