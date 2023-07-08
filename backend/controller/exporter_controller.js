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

exports.updateExporter = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, contactNo, address } = req.body;
    let updateExporterDetails = await exporterService.updateExporterDetails(
      userId,
      firstName,
      lastName,
      contactNo,
      address
    );
    res.json({ status: true, success: updateExporterDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
