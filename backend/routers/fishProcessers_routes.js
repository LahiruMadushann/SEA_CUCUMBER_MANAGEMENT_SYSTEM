const router = require("express").Router();
const fishProcesserController = require("../controller/fishProcesser_controller");
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

router.post(
  "/fishProcessers/register",
  imageMiddleware.single("profilepic"),
  fishProcesserController.registerFishProcesser
);

router.put("/fishProcessers/update", userController.updateUser);

router.put(
  "/fishProcessers/updateProfilePic",
  imageMiddleware.single("profilepic"),
  userController.updateProfilePic
);

router.delete("/fishProcessers/delete", userController.deleteUser);

router.post("/fishProcessers/changePassword", userController.changePassword);

// router.get(
//   "/exporter/getAquaFarmDetails",
//   exporterController.getAquaFarmDetails
// );

module.exports = router;
