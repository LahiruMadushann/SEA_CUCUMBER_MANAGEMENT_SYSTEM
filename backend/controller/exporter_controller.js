const exporterService = require("../services/exporter_services");

exports.registerExporter = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, contactNo, address } =
      req.body;

    const successResExporter = await exporterService.registerExporter(
      username,
      password,
      "exporter",
      firstName,
      lastName,
      contactNo,
      address
    );

    res.json({ status: true, success: successResExporter });
  } catch (error) {
    next(error);
  }
};
