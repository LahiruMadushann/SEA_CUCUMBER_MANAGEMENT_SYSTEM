const userModel = require("../model/user_model");
const farmModel = require("../model/farm/aqFarm_model");

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

  //GETTING AQUACULTURE FARM DETAILS
  static async getAllAquaFarms() {
    const aquaFarmDetails = await farmModel.find();
    return aquaFarmDetails;
  }

  //   //UPDATE FARMER ACCOUNT DETAILS
  //   static async updateFarmerDetails(
  //     userId,
  //     firstName,
  //     lastName,
  //     contactNo,
  //     address
  //   ) {
  //     const updateFarmerDetails = await aquaFarmerModel.findByIdAndUpdate(
  //       { _id: userId },
  //       {
  //         firstName: firstName,
  //         lastName: lastName,
  //         contactNo: contactNo,
  //         address: address,
  //       }
  //     );
  //     return "Successfully updated farmer details";
  //   }

  //   //DELETE FARMER ACCOUNT
  //   static async deleteFarmerAccount(userId) {
  //     const deleteFarmer = await aquaFarmerModel.findByIdAndDelete(userId);
  //     return "Successfully deleted farmer Account";
  //   }
}

module.exports = farmerService;
