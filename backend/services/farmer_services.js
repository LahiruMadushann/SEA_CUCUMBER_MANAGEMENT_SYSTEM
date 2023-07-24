const userModel = require("../model/user_model");
const farmModel = require("../model/farm/aqFarm_model");
const newsModel = require("../model/news_model");

const bcrypt = require("bcrypt");

class farmerService {
  //REEGISTER FARMER DETAILS
  static async registerFarmer(
    username,
    password,
    role,
    subrole,
    firstName,
    lastName,
    age,
    gender,
    contactNo,
    address,
    farmName,
    farmId,
    accountStatus
  ) {
    try {
      const createFarmer = new userModel({
        username,
        password,
        role,
        subrole,
        firstName,
        lastName,
        age,
        gender,
        contactNo,
        address,
        farmName,
        farmId,
        accountStatus,
      });

      return await createFarmer.save();
    } catch (err) {
      throw err;
    }
  }

  //UPDATE FARMER ACCOUNT DETAILS
  static async updateFarmerDetails(
    userId,
    firstName,
    lastName,
    age,
    contactNo,
    address
  ) {
    const updateFarmerDetails = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        age: age,
        contactNo: contactNo,
        address: address,
      }
    );
    return "Successfully updated farmer details";
  }

  //DELETE FARMER ACCOUNT
  static async deleteFarmerAccount(userId) {
    const deleteFarmer = await userModel.findByIdAndDelete(userId);
    return "Successfully deleted farmer Account";
  }

  //GET INDIVIDUAL FARMER DETAILS
  static async getFarmerDetails(userId) {
    const farmerDetails = await userModel.findById({ _id: userId });
    return farmerDetails;
  }

  //CHANGE FARMER PASSWORD
  static async changePassword(userId, newpassword) {
    let msg;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(newpassword, salt);

      const changePassword = await userModel.findByIdAndUpdate(
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

  //GETTING AQUACULTURE FARM DETAILS
  static async getAllAquaFarms() {
    const aquaFarmDetails = await farmModel.find();
    return aquaFarmDetails;
  }

  //GETTING FARM RELATED NEWS DETAILS
  static async getAquaFarmsNews() {
    const aquaFarmNews = await newsModel.find().sort({ _id: -1 });
    return aquaFarmNews;
  }
}

module.exports = farmerService;
