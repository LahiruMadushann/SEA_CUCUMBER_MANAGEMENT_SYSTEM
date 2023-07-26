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
const knowledgeCenterModel = require("../model/knowledgeCenter/knowledgeCenter_model");

class AdminService {
  //REGISTER ADMIN ACCOUNTS
  static async registerAdmin(
    username,
    password,
    role,
    firstName,
    lastName,
    age,
    gender,
    email,
    contactNo,
    address,
    profilepic
  ) {
    try {
      const createAdmin = new UserModel({
        username: username,
        password: password,
        role: role,
        age: age,
        gender: gender,
        email: email,
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address,
        profilepic: profilepic,
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

  /* OPERATIONS IN ADMIN - FOR AQUACULTURE MANAGEMENT LEVEL USERS */

  //Registering Aquaculture Management users
  static async registerAqFarmMangementLevelUsers(
    username,
    password,
    role,
    subrole,
    age,
    gender,
    email,
    firstName,
    lastName,
    contactNo,
    address,
    town,
    province,
    country,
    profilepic,
    createdAt
  ) {
    try {
      const createAqManagementUsers = new UserModel({
        username,
        password,
        role,
        subrole,
        age,
        gender,
        email,
        firstName,
        lastName,
        contactNo,
        address,
        town,
        province,
        country,
        profilepic,
        createdAt,
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

  /*----------------------------------------------------------------------*/
  //OPERATIONS RELATED TO KNOWLEDGE CENTER

  static async enterIndividualSeacucumberDetails(
    sc_speciesType,
    sc_scientificName,
    sc_description,
    sc_habitatsAndFeeding,
    sc_reproductionAndLifecycle,
    sc_fishingMethods,
    sc_seacucumberImages
  ) {
    try {
      const enterSpeciesDetails = new knowledgeCenterModel({
        speciesType: sc_speciesType,
        scientificName: sc_scientificName,
        description: sc_description,
        habitatsAndFeeding: sc_habitatsAndFeeding,
        reproductionAndLifecycle: sc_reproductionAndLifecycle,
        fishingMethods: sc_fishingMethods,
        images: sc_seacucumberImages,
      });

      return await enterSpeciesDetails.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AdminService;
