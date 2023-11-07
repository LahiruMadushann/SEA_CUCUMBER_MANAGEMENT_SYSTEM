const router = require("express").Router();
const fishermanController = require("../controller/fisherman_controller");
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");
const fishingImageMiddleware = require("../middleware/fishingImages_middleware");

router.post(
  "/fisherman/register",
  imageMiddleware.single("profilepic"),
  fishermanController.registerFisherman
);

router.put("/fisherman/update", userController.updateUser);

router.put(
  "/fisherman/updateProfilePic",
  imageMiddleware.single("profilepic"),
  userController.updateProfilePic
);

router.delete("/fisherman/delete", userController.deleteUser);

router.post("/fisherman/changePassword", userController.changePassword);

router.post(
  "/fisherman/enterFishingDetails",
  fishingImageMiddleware.single("fishingImage"),
  fishermanController.enterFishingDetails
);

router.post(
  "/fisherman/deleteFishingDetails",
  fishermanController.deleteFishingDetails
);

router.post(
  "/fisherman/getFishingDetailsByFisherman",
  fishermanController.getFishingDetailsByFisherman
);

router.post(
  "/fisherman/getSingleFishingDetails",
  fishermanController.getSingleFishingDetails
);

module.exports = router;
