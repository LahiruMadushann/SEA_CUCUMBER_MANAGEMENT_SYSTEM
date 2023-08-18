const router = require("express").Router();
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

router.get("/user/getAllNotifications", userController.getAllNotifications);

module.exports = router;
