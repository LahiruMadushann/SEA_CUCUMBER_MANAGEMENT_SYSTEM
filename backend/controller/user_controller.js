const userService = require("../services/user_services");

const bcrypt = require("bcrypt");

//DELETE USER ACCOUNT CONTROLLER
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deleteUserAccount = await userService.deleteUserAccount(userId);

    if (deleteUserAccount) {
      res.status(200).json({
        success: true,
        message: "Your account was deleted Successfully",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Delete Account Unsuccessfully" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//CHANGEPASSWORD
exports.changePassword = async (req, res, next) => {
  try {
    const { userId, oldpassword, newPassword, confirmPassword } = req.body;

    if (oldpassword == "" || newPassword == "" || confirmPassword == "") {
      res.status(400).json({
        success: false,
        message: "Please Enter a value",
      });
    } else if (newPassword != confirmPassword) {
      res.status(400).json({
        success: false,
        message: "New Password doesn't match",
      });
    } else {
      let data = await userService.getUserDetails(userId);

      let oldPasswordDB = data.password;

      bcrypt.compare(oldpassword, oldPasswordDB, function (err, result) {
        if (result) {
          userService
            .changePassword(userId, newPassword)
            .then((result) => {
              res.status(200).json({
                success: true,
                message: "Password changed Successfully",
                data: result,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          res.status(400).json({
            success: false,
            message: "Error when comparing passwords",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
    next(error);
  }
};

//GETTING INDIVIDUAL USER DETAILS
exports.getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let userDetails = await userService.getUserDetails(userId);

    if (userDetails) {
      res.status(200).json({
        success: true,
        message: "Found User deatils",
        data: userDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "User details not found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//UPDATE USER DETAILS CONTROLLER
exports.updateUser = async (req, res, next) => {
  try {
    const {
      userId,
      age,
      gender,
      email,
      firstName,
      lastName,
      contactNo,
      address,
      town,
      province,
      country,
    } = req.body;

    const updatedAt = new Date().toISOString();

    let updateUserDetails = await userService.updateUserDetails(
      userId,
      firstName,
      lastName,
      age,
      gender,
      email,
      contactNo,
      address,
      town,
      province,
      country,
      updatedAt
    );
    if (updateUserDetails) {
      res.status(200).json({ success: true, message: "Updated Successfully" });
    } else {
      res.status(400).json({ success: false, message: "Update Unsuccessful" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//UPDATE USER Profile Picture CONTROLLER
exports.updateProfilePic = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const profilepic = req.file.filename;

    let updateProfilepic = await userService.updateProfilePic(
      userId,
      profilepic
    );
    if (updateProfilepic) {
      res.status(200).json({
        success: true,
        message: "Profile Piicture Updated Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Profile Piicture Update Unsuccessful",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GET SINGLE NOTIFICATION DETAILS
exports.getSingleNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.body;

    let singleNotification = await userService.getSingleNotification(
      notificationId
    );

    if (singleNotification) {
      res.status(200).json({ status: true, data: singleNotification });
    } else {
      res
        .status(404)
        .json({ status: false, message: "There are no Notification" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GET ALL NOTIFICATION DETAILS
exports.getAllNotifications = async (req, res, next) => {
  try {
    let allNotifications = await userService.getAllNotifications();

    if (allNotifications) {
      res.status(200).json({ status: true, data: allNotifications });
    } else {
      res
        .status(404)
        .json({ status: false, message: "There are no Notifications" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GET SINGLE ADVERTISEMENT DETAILS
exports.getSingleAdvertisement = async (req, res, next) => {
  try {
    const { advertisementId } = req.body;

    let singleAdvertisement = await userService.getSingleAdvertisement(
      advertisementId
    );

    if (singleAdvertisement) {
      res.status(200).json({ status: true, data: singleAdvertisement });
    } else {
      res
        .status(404)
        .json({ status: false, message: "There are no Notification" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GET ALL ADVERTISEMENTS DETAILS
exports.getAllAdvertisements = async (req, res, next) => {
  try {
    let allAdvertisements = await userService.getAllAdvertisements();

    if (allAdvertisements) {
      res.status(200).json({ status: true, data: allAdvertisements });
    } else {
      res
        .status(404)
        .json({ status: false, message: "There are no Notifications" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//UPLOAD IMAGES
exports.uploadImage = async (req, res, next) => {
  try {
    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }
    const imgUrl = `http://localhost:3000/images/${req.file.filename}`;
    // console.log(imgUrl);

    const successResFarm = await userService.saveImage(req.file.filename);

    res.json({ status: true, success: req.file });
  } catch (error) {
    next(error);
  }
};

//CONTACT US
exports.contactUs = async (req, res, next) => {
  try {
    const { name, email, contactNo, comment } = req.body;

    const commentDate = new Date().toISOString();

    let commentSend = await userService.enterContactUsInfo(
      name,
      email,
      contactNo,
      comment,
      commentDate
    );
    if (commentSend) {
      res.status(200).json({
        success: true,
        message: "Message recieved. We'll get to you as soon as possible",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Message send Unsuccessful" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GET ALL SEA CUCUMBER SPECIES DETAILS
exports.getAllSpeciesData = async (req, res, next) => {
  try {
    let allSpeciesData = await userService.getAllSeacucumberSpeciesData();

    if (allSpeciesData) {
      res.status(200).json({ status: true, data: allSpeciesData });
    } else {
      res.status(404).json({ status: false, message: "There are no Data" });
    }
  } catch (error) {
    console.log(error, error.message);
    next(error);
  }
};

//GET SINGLE SPECIES DETAILS
exports.getSingleSpeciesDetail = async (req, res, next) => {
  try {
    const { speciesId } = req.body;

    let singleSpeciesDeatails = await userService.getSingleSpeciesDetails(
      speciesId
    );

    if (singleSpeciesDeatails) {
      res.status(200).json({ status: true, data: singleSpeciesDeatails });
    } else {
      res.status(404).json({ status: false, message: "There are no Data" });
    }
  } catch (error) {
    console.log(error, error.message);
    next(error);
  }
};

//GET ALL FAQ DETAILS
exports.getAllFAQDetails = async (req, res, next) => {
  try {
    let allFAQDetails = await userService.getAllFaqDetails();

    if (allFAQDetails) {
      res.status(200).json({ status: true, data: allFAQDetails });
    } else {
      res.status(404).json({ status: false, message: "There are no Data" });
    }
  } catch (error) {
    console.log(error, error.message);
    next(error);
  }
};
