const router = require("express").Router();
const farmMngUsersController = require("../controller/farmMngUsers_controller");

router.put("/farmMngUsers/update", farmMngUsersController.updatefarmMngUsers);

router.delete("/farmMngUsers/delete", farmMngUsersController.deleteFarmMngUser);

router.post(
  "/farmMngUsers/changePassword",
  farmMngUsersController.changePassword
);

router.post("/farmMngUsers/enterNews", farmMngUsersController.enterNews);

router.post("/farmMngUsers/farmRegistration", farmMngUsersController.registerFarm);

module.exports = router;
