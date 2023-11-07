const router = require("express").Router();
const adminController = require("../controller/admin_controller");
const userController = require("../controller/user_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

const seaCucumberImagesMiddleware = require("../middleware/speciesImages_middleware");

router.post(
  "/admin/register",
  imageMiddleware.single("profilepic"),
  adminController.register
);

router.put("/admin/update", userController.updateUser);

router.put(
  "/admin/updateProfilePic",
  imageMiddleware.single("profilepic"),
  userController.updateProfilePic
);

router.post("/admin/changePassword", userController.changePassword);

/* --------------------------------------------------------------- */
//CONTROLLING AQUACULTURE USERS

//To create Aquaculture Management Users
router.post(
  "/admin/createAqUser",
  imageMiddleware.single("profilepic"),
  adminController.registerAqFarmManagementUsers
);

//To get the details of Aquaculture Management Users
router.get("/admin/getAqMngUsers", adminController.getAqAllFarmManagementUsers);

//To delete the details of Aquaculture Management Users
router.delete("/admin/deleteAqMngUsers", userController.deleteUser);

/* ---------------- CONTROLLING  FARMS------------------ */

router.get("/admin/getAllFarms", adminController.getAqAllFarms);

router.delete("/admin/deleteFarm", adminController.deleteAqFarm);

/* ---------------- CONTROLLING  FARMERS------------------ */

router.post(
  "/admin/approveFarmerAccount",
  adminController.approveFarmerAccount
);

router.get("/admin/getAllFarmers", adminController.getAllFarmers);

router.delete("/admin/deleteFarmer", userController.deleteUser);

/* ---------------- CONTROLLING  EXPORTERS------------------ */

router.get("/admin/getAllExporters", adminController.getAllExporters);

router.delete("/admin/deleteExporter", userController.deleteUser);

/* ---------------- CONTROLLING  FISH PROCESSORS------------------ */

router.get("/admin/getAllFishProcessors", adminController.getAllFishProcessors);

router.delete("/admin/deleteFishProcessor", userController.deleteUser);

/* ---------------- CONTROLLING  FISHERMEN------------------ */

router.get("/admin/getAllFisherman", adminController.getAllFishermens);

// router.delete(
//   "/admin/deleteFishman",
//   adminController.deleteAqFarmManagementUser
// );

/* --------------------------------------------------------------- */
//ADMIN KNOWLEDGE CENTER OPERATIONS

router.post(
  "/admin/enterSpeciesDetails",
  seaCucumberImagesMiddleware.single("seaCucumberImages"),
  adminController.enterSeacucumberDetails
);

router.put(
  "/admin/updateSpeciesDetails",
  adminController.updateSeacucumberDetails
);

router.delete(
  "/admin/deleteSpeciesDetails/:id",
  adminController.deleteSeaCucumberDetails
);

router.post("/admin/enterArticleDetails", adminController.enterArticleDetails);
router.put("/admin/updateArticleDetails", adminController.updateArticleDetails);
router.delete(
  "/admin/deleteArticleDetails/:id",adminController.deleteArticleDetails);

/*-- FREQUENTLY ASKED QUESTIONS --*/
router.post("/admin/enterFaqdetails", adminController.enterFAQDetails);
router.delete("/admin/deleteFaqdetails/:id", adminController.deleteFAQDetails);
router.put("/admin/updateFaqdetails", adminController.updateFAQs);

/*-- REPLY CONTACT US --*/
router.put("/admin/replyContactUsComment", adminController.replyComment);

//Get All User details
router.get("/user/:id", adminController.getUser);

router.delete("/admin/deleteUser/:id", adminController.deleteUser);
router.post("/admin/enterNews", adminController.addNews);
router.post("/admin/enterFaq", adminController.addFaq);
router.put(
  "/admin/updateUser/:id/:state",
  adminController.approveFarmerAccount
);
module.exports = router;
