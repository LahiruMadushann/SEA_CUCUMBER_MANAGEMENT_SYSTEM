const fishCollectorModel = require("../model/fishCollector_model");

class fishCollectorService {
  //REGISTER FISH COLLECTOR
  static async registerFishCollector(
    username,
    password,
    role,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    try {
      const createFishCollector = new fishCollectorModel({
        username,
        password,
        role,
        firstName,
        lastName,
        contactNo,
        address,
      });

      return await createFishCollector.save();
    } catch (err) {
      throw err;
    }
  }

  //UPDATE FISH COLLECTOR ACCOUNT DETAILS
  static async updateFishCollectorDetails(
    userId,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    const updateFishCollectorDetails =
      await fishCollectorModel.findByIdAndUpdate(
        { _id: userId },
        {
          firstName: firstName,
          lastName: lastName,
          contactNo: contactNo,
          address: address,
        }
      );
    return "Successfully updated Fish Collector details";
  }

  //DELETE FISH COLLECTOR ACCOUNT
  static async deleteFishCollectorAccount(userId) {
    const deleteFishCollector = await fishCollectorModel.findByIdAndDelete(
      userId
    );
    return "Successfully deleted Fish Collector Account";
  }

  //GETTING FISHERMAN DETAILS
  // static async getAllFisherman() {
  //   const finshermanDetails = await fishCollectorModel.find();
  //   return finshermanDetails;
  // }
}

module.exports = fishCollectorService;
