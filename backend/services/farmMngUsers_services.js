const aquaFarmMngUsersModel = require("../model/farm/aqfarm_managementLevelUsers");

class aquaFramMngUsersService {
  static async updateFarmMngUserDetails(
    userId,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    const updateFarmMngUsers = await aquaFarmMngUsersModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address,
      }
    );
    return "Successfully updated Farm Management User details";
  }
}

module.exports = aquaFramMngUsersService;
