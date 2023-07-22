const userModel = require("../model/user_model");
const aquaFarmDetailsModel = require("../model/farm/aqFarm_model");

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

  //GETTING AQUACULTURE FARM DETAILS
  static async getAllAquaFarms() {
    const aquaFarmDetails = await aquaFarmDetailsModel.find();
    // console.log(aquaFarmDetails);
    return aquaFarmDetails;
  }

  //GET INDIVIDUAL AQUACULTURE FARM DETAIL
  static async getIndividualFarmDetails(farmId) {
    const individualFarmDetails = await aquaFarmDetailsModel.findById({
      _id: farmId,
    });
    return individualFarmDetails;
  }
}

module.exports = exporterService;
