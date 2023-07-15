const router = require("express").Router();
const loginController = require("../controller/login_controller");
const { isAuth } = require("../controller/auth_controller");

router.post("/login", loginController.login);

router.post("/logout", isAuth, loginController.signout);

module.exports = router;
