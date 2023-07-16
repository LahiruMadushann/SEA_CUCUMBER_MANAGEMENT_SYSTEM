const adminModel = require("../model/admin_model");
const aquaFarmManagementUsersModel = require("../model/farm/aqfarm_managementLevelUsers");
const bcrypt = require("bcrypt");

class AdminService {
  //REGISTER ADMIN ACCOUNTS
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

  //UPDATE ADMIN ACCOUNTS
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
    const adminDetails = await adminModel.findById({ _id: userId });
    return adminDetails;
  }

  //CHANGE ADMIN PASSWORD
  static async changePassword(userId, newpassword) {
    let msg;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(newpassword, salt);

      const changePassword = await adminModel.findByIdAndUpdate(
        { _id: userId },
        {
          password: hashpass,
        }
      );

      if (changePassword) {
        msg = "Successfully updated Password";
      } else {
        msg = "Error when updating Password";
      }

      return msg;
    } catch (err) {
      throw err;
    }
  }

  /* OPERATIONS IN ADMIN - FOR AQUA MANAGEMENT LEVEL USERS */

  //Registering Aquaculture Management users
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

  //Getting Aquaculture Management users
  static async getAllAqManagementUsers() {
    const aqMngUserDetails = await aquaFarmManagementUsersModel.find();
    console.log(aqMngUserDetails);
    return aqMngUserDetails;
  }

  //Deleting Aquaculture Management users
  static async deleteAqManagementUserById(id) {
    const deleteAquaMngLevelUser =
      await aquaFarmManagementUsersModel.findByIdAndDelete({
        _id: id,
      });
    return deleteAquaMngLevelUser;
  }
}

module.exports = AdminService;
