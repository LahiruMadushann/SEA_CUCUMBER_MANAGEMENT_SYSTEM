const router = require("express").Router();
const adminController = require("../controller/admin_controller");

router.post("/admin/register", adminController.register);

router.put("/admin/update", adminController.updateAdminDetails);

router.post(
  "/admin/createAqUser",
  adminController.registerAqFarmManagementUsers
);

module.exports = router;
