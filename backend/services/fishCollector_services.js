const fishCollectorModel = require("../model/fishCollector_model");

class fishCollectorService {
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

  //GETTING FISHERMAN DETAILS
  // static async getAllFisherman() {
  //   const finshermanDetails = await fishCollectorModel.find();
  //   return finshermanDetails;
  // }
}

module.exports = fishCollectorService;
