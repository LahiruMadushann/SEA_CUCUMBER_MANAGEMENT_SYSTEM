const router = require("express").Router();
const loginController = require("../controller/login_controller");
const { isAuth } = require("../middleware/auth_middleware");

router.post("/login", loginController.login);

router.post("/forgotPassword", loginController.forgotPassword);

router.post("/logout", isAuth, loginController.signout);

module.exports = router;
