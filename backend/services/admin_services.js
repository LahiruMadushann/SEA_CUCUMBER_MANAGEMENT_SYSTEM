/* FUNCTIONS OF THE ADMIN 

*REGISTER ADMIN ACCOUNTS
*UPDATE ADMIN DETAILS
*CHANGE ADMIN PASSWORD

*REGISTER / GET DETAILS / DELETE - AQUACULTURE MANAGEMENT USERS - MINISTER / CHAIRMAN / DG / ASSISTANT DIRECTOR / DISTRICT AQUACULTURIST
*GET / DELETE DETAILS - FARM 
*APPROVE ACCOUNT / GET DETAILS / DELETE DETAILS- FARMER
*HAVE ACCESS TO THE DASHBOARD

*/

// const adminModel = require("../model/admin_model");
const UserModel = require("../model/user_model");
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
      const createAdmin = new UserModel({
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
    const updateadminDetails = await UserModel.findByIdAndUpdate(
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
    const adminDetails = await UserModel.findById({ _id: userId });
    return adminDetails;
  }

  //CHANGE ADMIN PASSWORD
  static async changePassword(userId, newpassword) {
    let msg;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(newpassword, salt);

      const changePassword = await UserModel.findByIdAndUpdate(
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

  /* OPERATIONS IN ADMIN - FOR AQUACULTURE MANAGEMENT LEVEL USERS */

  //Registering Aquaculture Management users
  static async registerAqFarmMangementLevelUsers(
    username,
    password,
    role,
    age,
    subRole,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    try {
      const createAqManagementUsers = new UserModel({
        username,
        password,
        role,
        age,
        subRole,
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
    const aqMngUserDetails = await UserModel.find();
    console.log(aqMngUserDetails);
    return aqMngUserDetails;
  }

  //Deleting Aquaculture Management users
  static async deleteAqManagementUserById(id) {
    const deleteAquaMngLevelUser = await UserModel.findByIdAndDelete({
      _id: id,
    });
    return deleteAquaMngLevelUser;
  }
}

module.exports = AdminService;
