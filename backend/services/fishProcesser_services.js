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
    companyName,
    processorRegNo,
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
        companyName,
        processorRegNo,
        accountStatus: "Inactive",
        profilepic,
        createdAt,
      });

      return await createFishProcesser.save();
    } catch (err) {
      throw err;
    }
  }

  /* --------------------- PROCESSED STOCK DETAILS FUNCTIONS ------------------------------------- */

  //ENTER PROCESSED DETAILS
  static async enterProcessedDetails(
    processorId,
    speciesType,
    weight,
    collectedFrom,
    collectedLocation,
    processorStockImages,
    date
  ) {
    try {
      const enterProcessedDetails = new processedDetailModel({
        processorId,
        speciesType,
        weight,
        collectedFrom,
        collectedLocation,
        processorStockImages,
        date,
      });

      return await enterProcessedDetails.save();
    } catch (err) {
      throw err;
    }
  }

  //UPDATE PROCESSED DETAILS
  static async updateprocessedStockDetails(
    processorId,
    speciesType,
    weight,
    collectedFrom,
    collectedLocation
  ) {
    const updateProcessedDetails = await processedDetailModel.findByIdAndUpdate(
      { _id: processorId },
      {
        speciesType,
        weight,
        collectedFrom,
        collectedLocation,
      }
    );
    return updateProcessedDetails;
  }

  //DELETE PROCESSED DETAILS
  static async deleteProcessedStockDetails(recordId) {
    const deletedStockDetails = await processedDetailModel.findByIdAndDelete({
      _id: recordId,
    });
    return deletedStockDetails;
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
}

module.exports = fishProcesserService;
