const userModel = require("../model/user_model");

class fishProcesserService {
  //REGISTER FISH PROCESSER
  static async registerFishProcesser(
    username,
    password,
    role,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    try {
      const createFishProcesser = new userModel({
        username,
        password,
        role,
        firstName,
        lastName,
        contactNo,
        address,
      });

      return await createFishProcesser.save();
    } catch (err) {
      throw err;
    }
  }

  //UPDATE FISH PROCESSER ACCOUNT DETAILS
  static async updateFishProcesserDetails(
    userId,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    const updateFishProcesserDetails =
      await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          firstName: firstName,
          lastName: lastName,
          contactNo: contactNo,
          address: address,
        }
      );
    return "Successfully updated Fish Processer details";
  }

  //DELETE FISH PROCESSER ACCOUNT
  static async deleteFishProcesserAccount(userId) {
    const deleteFishProcesser = await userModel.findByIdAndDelete(
      userId
    );
    return "Successfully deleted Fish Processer Account";
  }

  //GETTING FISHERMAN DETAILS
  // static async getAllFisherman() {
  //   const finshermanDetails = await fishCollectorModel.find();
  //   return finshermanDetails;
  // }
}

module.exports = fishProcesserService;
