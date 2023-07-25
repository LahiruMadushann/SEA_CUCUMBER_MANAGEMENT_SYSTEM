const userModel = require("../model/user_model");
const aquaFarmDetailsModel = require("../model/farm/aqFarm_model");

const bcrypt = require("bcrypt");

class exporterService {
  //REEGISTER EXPORTER DETAILS
  static async registerExporter(
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
      const createExporter = new userModel({
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

      return await createExporter.save();
    } catch (err) {
      throw err;
    }
  }

  //UPDATE EXPORTER ACCOUNT DETAILS
  static async updateExporterDetails(
    userId,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    const updateExporterDetails = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address,
      }
    );
    return "Successfully updated exporter details";
  }

  //GET INDIVIDUAL EXPORTER DETAILS
  static async getExporterDetails(userId) {
    const exporterDetails = await userModel.findById({ _id: userId });
    return exporterDetails;
  }

  //GETTING AQUACULTURE FARM DETAILS
  static async getAllAquaFarms() {
    const aquaFarmDetails = await aquaFarmDetailsModel.find();
    return aquaFarmDetails;
  }

  //GET INDIVIDUAL AQUACULTURE FARM DETAIL
  static async getIndividualFarmDetails(farmId) {
    const individualFarmDetails = await aquaFarmDetailsModel.findById({
      _id: farmId,
    });
    return individualFarmDetails;
  }

  //GET ALL FISHPROCESSORS DETAILS
  static async getAllFishProcessors() {
    const roleName = "FishProcessor";
    const fishProcessorDetails = await userModel.find({ role: roleName });
    return fishProcessorDetails;
  }

  //GET INDIVIDUAL FISHPROCESSORS DETAILS
  static async getindividualFishProcessor(userId) {
    const individualFishProcessorDetails = await userModel.findById({
      _id: userId,
    });
    return individualFishProcessorDetails;
  }
}

module.exports = exporterService;
