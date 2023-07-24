const router = require("express").Router();
const farmMngUsersController = require("../controller/farmMngUsers_controller");

const userController = require("../controller/user_controller");

router.put("/farmMngUsers/update", farmMngUsersController.updatefarmMngUsers);

router.delete("/farmMngUsers/delete", userController.deleteUser);

router.post("/farmMngUsers/changePassword", userController.changePassword);

router.post("/farmMngUsers/enterNews", farmMngUsersController.enterNews);

router.post(
  "/farmMngUsers/enterSeacucumberRates",
  farmMngUsersController.enterSeacucumberRates
);

router.post(
  "/farmMngUsers/farmRegistration",
  farmMngUsersController.registerFarm
);

module.exports = router;
