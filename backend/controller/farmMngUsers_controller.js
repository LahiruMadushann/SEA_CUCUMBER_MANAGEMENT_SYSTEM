const farmMngUserService = require("../services/farmMngUsers_services");

exports.updatefarmMngUsers = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, contactNo, address } = req.body;
    let updatefarmMngUserDetail =
      await farmMngUserService.updateFarmMngUserDetails(
        userId,
        firstName,
        lastName,
        contactNo,
        address
      );
    res.json({ status: true, success: updatefarmMngUserDetail });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
