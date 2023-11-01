const userModel = require("../model/user_model");
const processedDetailModel = require("../model/processedDetails_model");

class fishProcesserService {
  //REGISTER FISH PROCESSER
  static async registerFishProcesser(
    username,
    password,
    role,
    age,
    gender,
    email,
    nicNo,
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
        nicNo,
        firstName,
        lastName,
        contactNo,
        address,
        town,
        province,
        country,
        accountStatus:"Active",
        profilepic,
        createdAt,
      });

      return await createFishProcesser.save();
    } catch (err) {
      throw err;
    }
  }

  //ENTER PROCESSED DETAILS
  static async enterProcessedDetails(
    processorId,
    spiecesType,
    weight,
    receivedFrom,
    date
  ) {
    try {
      const enterProcessedDetails = new processedDetailModel({
        processorId,
        spiecesType,
        weight,
        receivedFrom,
        date,
      });

      return await enterProcessedDetails.save();
    } catch (err) {
      throw err;
    }
  }

  //GET INDIVIDUAL FISH PROCESSER DETAILS
  static async getFishProcesserDetails(userId) {
    const FishProcesserDetails = await userModel.findById({ _id: userId });
    return FishProcesserDetails;
  }

  //GETTING PROCESSED SEA CUCUMBER DETAILS FROM A INDIVIDUAL PROCESSOR
  static async getProcessedSCDetails(processorId) {
    try {
      const getPCDetails = await processedDetailModel
        .find({
          processorId: processorId,
        })
        .sort({ date: -1 });
      console.log("Details: ", getPCDetails);
      return getPCDetails;
    } catch (error) {
      console.error("Error fetching details:", error.message);
      throw error;
    }
  }

  //GETTING SINGLE PROCESSED SEA CUCUMBER DETAILS FROM A INDIVIDUAL PROCESSOR
  static async getProcessedRecordDetails(recordId) {
    try {
      const getRecordDetails = await processedDetailModel.find({
        _id: recordId,
      });
      console.log("Details: ", getRecordDetails);
      return getRecordDetails;
    } catch (error) {
      console.error("Error fetching details:", error.message);
      throw error;
    }
  }
}

module.exports = fishProcesserService;
