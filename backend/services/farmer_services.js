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
    accountStatus,
    profilepic
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
        profilepic,
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

  //GET INDIVIDUAL FARMER DETAILS
  static async getFarmerDetails(userId) {
    const farmerDetails = await userModel.findById({ _id: userId });
    return farmerDetails;
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
