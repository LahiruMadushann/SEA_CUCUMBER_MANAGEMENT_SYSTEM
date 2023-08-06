const userModel = require("../model/user_model");

class fishProcesserService {
  //REGISTER FISH PROCESSER
  static async registerFishProcesser(
    username,
    password,
    role,
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
      const createFishProcesser = new userModel({
        username,
        password,
        role,
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
    return updateFishProcesserDetails;
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
