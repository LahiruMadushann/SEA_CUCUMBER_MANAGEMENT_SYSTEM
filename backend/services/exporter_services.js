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
}

module.exports = exporterService;
