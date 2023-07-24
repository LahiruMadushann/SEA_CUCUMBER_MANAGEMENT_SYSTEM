const router = require("express").Router();
const adminController = require("../controller/admin_controller");
const userController = require("../controller/user_controller");

router.post("/admin/register", adminController.register);

router.put("/admin/update", adminController.updateAdminDetails);

router.post("/admin/changePassword", userController.changePassword);

//CONTROLLING AQUACULTURE USERS

//To create Aquaculture Management Users
router.post(
  "/admin/createAqUser",
  adminController.registerAqFarmManagementUsers
);

//To get the details of Aquaculture Management Users
router.get("/admin/getAqMngUsers", adminController.getAqAllFarmManagementUsers);

//To delete the details of Aquaculture Management Users
router.delete(
  "/admin/deleteAqMngUsers",
  adminController.deleteAqFarmManagementUser
);
module.exports = router;
