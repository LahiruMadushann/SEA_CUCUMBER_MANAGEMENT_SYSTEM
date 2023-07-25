const adminService = require("../services/admin_services");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      age,
      gender,
      contactNo,
      address,
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const profilepic = req.file.filename;

    const successResFarm = await adminService.registerAdmin(
      username,
      password,
      "Admin",
      firstName,
      lastName,
      age,
      gender,
      contactNo,
      address,
      profilepic
    );

    res.json({ status: true, success: successResFarm });
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

//AQUACULTURE MANAGEMENT USERS - ADMIN CONTROLLERS

exports.registerAqFarmManagementUsers = async (req, res, next) => {
  try {
    const {
      username,
      password,
      role,
      subRole,
      firstName,
      lastName,
      age,
      gender,
      contactNo,
      address,
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const profilepic = req.file.filename;

    const aquaFarmMngUsers =
      await adminService.registerAqFarmMangementLevelUsers(
        username,
        password,
        role,
        subRole,
        firstName,
        lastName,
        age,
        gender,
        contactNo,
        address,
        profilepic
      );

    res.json({ status: true, success: aquaFarmMngUsers });
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
