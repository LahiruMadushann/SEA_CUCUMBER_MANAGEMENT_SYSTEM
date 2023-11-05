const router = require("express").Router();
const userController = require("../controller/user_controller");
const knowledgeCenterController = require("../controller/knowledgeCenter_controller");

const imageMiddleware = require("../middleware/profilepic_middleware");

router.put("/user/updateProfilePic",imageMiddleware.single("profilepic"), userController.updateProfilePic);



router.post("/user/getAllNotifications", userController.getAllNotifications);

router.post(
  "/user/getSingleNotification",
  userController.getSingleNotification
);

router.get("/user/getAllAdvertisements", userController.getAllAdvertisements);

router.post(
  "/user/getSingleAdvertisement",
  userController.getSingleAdvertisement
);

router.post("/user/contactUs", userController.contactUs);

router.post("/user/deleteAccount", userController.deleteUser);

router.get("/user/getAllSpeciesData", userController.getAllSpeciesData);

router.post(
  "/user/getSingleSpeciesData",
  userController.getSingleSpeciesDetail
);

//KNOWLEDGE CENTER ROUTES
router.get(
  "/user/getAllArticlesData",
  knowledgeCenterController.getAllArticlesData
);

router.get(
  "/user/getAllArticlesCategories",
  knowledgeCenterController.getAllArticlesCategories
);

//FAQ DETAILS

router.get("/user/getAllFAQDetails", userController.getAllFAQDetails);

//get all users
router.get("/user/getAllUsers", userController.getAllUserDetails);

//get all messages
router.get("/user/getContactUs", userController.getContactUs);

//update contactUs Messages
router.put("/user/updateContactUs/:id/:state",userController.updateContactUs)

module.exports = router;
