const exporterModel = require("../model/exporter_model");

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
    const updateadminDetails = await exporterModel.findByIdAndUpdate(
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
}

module.exports = exporterService;
