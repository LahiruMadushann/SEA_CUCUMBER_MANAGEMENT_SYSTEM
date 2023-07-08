const adminModel = require("../model/admin_model");
const aquaFarmManagementUsersModel = require("../model/farm/aqfarm_managementLevelUsers");

class AdminService {
  static async registerAdmin(
    username,
    password,
    role,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    try {
      const createAdmin = new adminModel({
        username,
        password,
        role,
        firstName,
        lastName,
        contactNo,
        address,
      });

      return await createAdmin.save();
    } catch (err) {
      throw err;
    }
  }

  static async updateAdminDetails(
    userId,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    const updateadminDetails = await adminModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address,
      }
    );
    return "Successfully updated admin details";
  }

  static async getAdminDetails(userId) {
    const adminDetails = await adminModel.find({ userId });
    return adminDetails;
  }

  static async registerAqFarmMangementLevelUsers(
    username,
    password,
    role,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    try {
      const createAqManagementUsers = new aquaFarmManagementUsersModel({
        username,
        password,
        role,
        firstName,
        lastName,
        contactNo,
        address,
      });

      return await createAqManagementUsers.save();
    } catch (err) {
      throw err;
    }
  }

  //Getting the data about the Aquaculture Management users
  static async getAllAqManagementUsers() {
    const aqMngUserDetails = await aquaFarmManagementUsersModel.find();
    console.log(aqMngUserDetails);
    return aqMngUserDetails;
  }

  static async deleteAqManagementUserById(id) {
    const deleteAquaMngLevelUser =
      await aquaFarmManagementUsersModel.findByIdAndDelete({
        _id: id,
      });
    return deleteAquaMngLevelUser;
  }
}

module.exports = AdminService;
