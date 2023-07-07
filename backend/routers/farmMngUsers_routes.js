const router = require("express").Router();
const farmMngUsersController = require("../controller/farmMngUsers_controller");

router.put("/farmMngUsers/update", farmMngUsersController.updatefarmMngUsers);

//router.put("/admin/update", adminController.updateAdminDetails);

module.exports = router;
