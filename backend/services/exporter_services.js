const exporterModel = require("../model/exporter_model");
const aquaFarmDetailsModel = require("../model/farm/aqFarm_model");

class exporterService {
  static async registerExporter(
    username,
    password,
    role,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    try {
      const createExporter = new exporterModel({
        username,
        password,
        role,
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

  static async updateExporterDetails(
    userId,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    const updateExporterDetails = await exporterModel.findByIdAndUpdate(
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

  static async deleteExporterAccount(userId) {
    const deleteExporter = await exporterModel.findByIdAndDelete(userId);
    return "Successfully deleted exporter Account";
  }

  //GETTING AQUACULTURE FARM DETAILS
  static async getAllAquaFarms() {
    const aquaFarmDetails = await aquaFarmDetailsModel.find();
    // console.log(aquaFarmDetails);
    return aquaFarmDetails;
  }
}

module.exports = exporterService;
