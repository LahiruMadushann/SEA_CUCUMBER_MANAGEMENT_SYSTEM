const userModel = require("../model/user_model");

class farmerService {
  //REEGISTER FARMER DETAILS
  static async registerFarmer(
    username,
    password,
    role,
    subRole,
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
        subRole,
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
