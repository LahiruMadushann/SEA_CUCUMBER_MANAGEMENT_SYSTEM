const userService = require("../services/user_services");

const bcrypt = require("bcrypt");

//DELETE USER ACCOUNT CONTROLLER
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deleteUserAccount = await userService.deleteUserAccount(userId);

    if (deleteUserAccount) {
      res
        .status(200)
        .json({ success: true, message: "Deleted Account Successfully" });
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
                data: reult,
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
