const router = require("express").Router();
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

router.get("/user/getAllNotifications", userController.getAllNotifications);

router.post(
  "/user/getSingleNotification",
  userController.getSingleNotification
);

router.get("/user/getAllAdvertisements", userController.getAllAdvertisements);

router.post(
  "/user/getSingleAdvertisement",
  userController.getSingleAdvertisement
);

router.post("/user/contactUs", userController.contactUs);

module.exports = router;
