const router = require("express").Router();
const adminController = require("../controller/admin_controller");
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

const seaCucumberImagesMiddleware = require("../middleware/speciesImages_middleware");

router.post(
  "/admin/register",
  imageMiddleware.single("profilePic"),
  adminController.register
);

router.put("/admin/update", adminController.updateAdminDetails);

router.post("/admin/changePassword", userController.changePassword);

/* --------------------------------------------------------------- */
//CONTROLLING AQUACULTURE USERS

//To create Aquaculture Management Users
router.post(
  "/admin/createAqUser",
  imageMiddleware.single("profilePic"),
  adminController.registerAqFarmManagementUsers
);

//To get the details of Aquaculture Management Users
router.get("/admin/getAqMngUsers", adminController.getAqAllFarmManagementUsers);

//To delete the details of Aquaculture Management Users
router.delete(
  "/admin/deleteAqMngUsers",
  adminController.deleteAqFarmManagementUser
);

/* --------------------------------------------------------------- */
//ADMIN KNOWLEDGE CENTER OPERATIONS

router.post(
  "/admin/enterSpeciesDetails",
  seaCucumberImagesMiddleware.single("seaCucumberImages"),
  adminController.enterSeacucumberDetails
);

module.exports = router;
