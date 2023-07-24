const userModel = require("../model/user_model");
const farmModel = require("../model/farm/aqFarm_model");
const newsModel = require("../model/news_model");

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
    gender,
    contactNo,
    address
  ) {
    const updateFarmerDetails = await aquaFarmerModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        contactNo: contactNo,
        address: address,
      }
    );
    return "Successfully updated farmer details";
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

  //   //DELETE FARMER ACCOUNT
  //   static async deleteFarmerAccount(userId) {
  //     const deleteFarmer = await aquaFarmerModel.findByIdAndDelete(userId);
  //     return "Successfully deleted farmer Account";
  //   }
}

module.exports = farmerService;
