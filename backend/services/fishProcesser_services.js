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
    const updateFishProcesserDetails = await userModel.findByIdAndUpdate(
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
    const deleteFishProcesser = await userModel.findByIdAndDelete(userId);
    return "Successfully deleted Fish Processer Account";
  }

  //CHANGE FISH PROCESSER PASSWORD
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

  //GET INDIVIDUAL FISH PROCESSER DETAILS
  static async getFishProcesserDetails(userId) {
    const FishProcesserDetails = await userModel.findById({ _id: userId });
    return FishProcesserDetails;
  }

  //GETTING FISHERMAN DETAILS
  // static async getAllFisherman() {
  //   const finshermanDetails = await fishCollectorModel.find();
  //   return finshermanDetails;
  // }
}

module.exports = fishProcesserService;
