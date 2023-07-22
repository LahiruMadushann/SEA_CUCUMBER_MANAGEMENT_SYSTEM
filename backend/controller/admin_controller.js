const adminService = require("../services/admin_services");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, contactNo, address } =
      req.body;

    const successResFarm = await adminService.registerAdmin(
      username,
      password,
      "admin",
      firstName,
      lastName,
      contactNo,
      address
    );

    res.json({ status: true, success: "Admin registered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateAdminDetails = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, contactNo, address } = req.body;
    let updatedadminDetails = await adminService.updateAdminDetails(
      userId,
      firstName,
      lastName,
      contactNo,
      address
    );
    res.json({ status: true, success: updatedadminDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { userId, oldpassword, newPassword, confirmPassword } = req.body;

    if (oldpassword == "" || newPassword == "" || confirmPassword == "") {
      res.json({ status: "FAILED", message: "Please Enter a value" });
    } else if (newPassword != confirmPassword) {
      res.json({ status: "FAILED", message: "New Password doesn't match" });
    } else {
      let data = await adminService.getAdminDetails(userId);

      let oldPasswordDB = data.password;

      bcrypt.compare(oldpassword, oldPasswordDB, function (err, result) {
        if (result) {
          adminService
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

//AQUACULTURE MANAGEMENT USERS - ADMIN CONTROLLERS

exports.registerAqFarmManagementUsers = async (req, res, next) => {
  try {
    const {
      username,
      password,
      role,
      age,
      subRole,
      firstName,
      lastName,
      contactNo,
      address,
    } = req.body;

    const successResFarm = await adminService.registerAqFarmMangementLevelUsers(
      username,
      password,
      role,
      age,
      subRole,
      firstName,
      lastName,
      contactNo,
      address
    );

    res.json({ status: true, success: successResFarm });
  } catch (error) {
    next(error);
  }
};

exports.getAqAllFarmManagementUsers = async (req, res, next) => {
  try {
    let aqMnguserDetails = await adminService.getAllAqManagementUsers();

    // console.log(aqMnguserDetails);
    res.json({ status: true, success: aqMnguserDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.deleteAqFarmManagementUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deletedDetails = await adminService.deleteAqManagementUserById(userId);

    res.json({
      status: true,
      success: "Successfully Deleted Aquaculture Management User",
    });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
