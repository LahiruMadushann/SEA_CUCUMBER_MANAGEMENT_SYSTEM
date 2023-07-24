const userService = require("../services/user_services");

const bcrypt = require("bcrypt");

//DELETE USER ACCOUNT CONTROLLER
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deleteUserAccount = await userService.deleteUserAccount(userId);
    res.json({ status: true, success: deleteUserAccount });
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
      res.json({ status: "FAILED", message: "Please Enter a value" });
    } else if (newPassword != confirmPassword) {
      res.json({ status: "FAILED", message: "New Password doesn't match" });
    } else {
      let data = await userService.getUserDetails(userId);

      let oldPasswordDB = data.password;

      bcrypt.compare(oldpassword, oldPasswordDB, function (err, result) {
        if (result) {
          userService
            .changePassword(userId, newPassword)
            .then((result) => {
              res.json({ status: true, success: result });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          res.json({ status: true, success: "Error when comparing passwords" });
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

    res.json({ status: true, success: FishProcessorDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
