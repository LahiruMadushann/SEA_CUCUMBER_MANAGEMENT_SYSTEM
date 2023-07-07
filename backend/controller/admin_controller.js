const adminService = require("../services/admin_services");

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

exports.registerAqFarmManagementUsers = async (req, res, next) => {
  try {
    const {
      username,
      password,
      role,
      firstName,
      lastName,
      contactNo,
      address,
    } = req.body;

    const successResFarm = await adminService.registerAqFarmMangementLevelUsers(
      username,
      password,
      role,
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
