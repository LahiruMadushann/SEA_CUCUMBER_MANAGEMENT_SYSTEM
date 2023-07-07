const router = require("express").Router();
const loginController = require("../controller/login_controller");

router.post("/login", loginController.login);

module.exports = router;
