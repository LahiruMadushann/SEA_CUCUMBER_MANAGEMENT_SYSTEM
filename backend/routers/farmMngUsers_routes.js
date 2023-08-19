const router = require("express").Router();
const farmMngUsersController = require("../controller/farmMngUsers_controller");
const imageMiddleware = require("../middleware/profilepic_middleware");
const userController = require("../controller/user_controller");
const farmImagesMiddleware = require("../middleware/farmImages_middleware");

router.put("/farmMngUsers/update", userController.updateUser);

router.put(
  "/farmMngUsers/updateProfilePic",
  imageMiddleware.single("profilepic"),
  userController.updateProfilePic
);

router.delete("/farmMngUsers/delete", userController.deleteUser);

router.post("/farmMngUsers/changePassword", userController.changePassword);

router.post("/farmMngUsers/enterNews", farmMngUsersController.enterNews);

router.post(
  "/farmMngUsers/enterSeacucumberRates",
  farmMngUsersController.enterSeacucumberRates
);

router.post(
  "/farmMngUsers/farmRegistration",
  farmImagesMiddleware.single("picture"),
  farmMngUsersController.registerFarm
);

module.exports = router;
