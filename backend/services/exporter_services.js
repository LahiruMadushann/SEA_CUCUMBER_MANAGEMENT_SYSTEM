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
    firstName,
    lastName,
    contactNo,
    address
  ) {
    try {
      const createExporter = new userModel({
        username,
        password,
        role,
        age,
        firstName,
        lastName,
        contactNo,
        address,
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

  //DELETE EXPORTER ACCOUNT
  static async deleteExporterAccount(userId) {
    const deleteExporter = await userModel.findByIdAndDelete(userId);
    return "Successfully deleted exporter Account";
  }

  //CHANGE EXPORTER PASSWORD
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
