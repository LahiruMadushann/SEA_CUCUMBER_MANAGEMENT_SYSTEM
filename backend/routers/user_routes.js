const router = require("express").Router();
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

router.get("/user/getAllNotifications", userController.getAllNotifications);

router.post(
  "/user/getSingleNotification",
  userController.getSingleNotification
);

module.exports = router;
