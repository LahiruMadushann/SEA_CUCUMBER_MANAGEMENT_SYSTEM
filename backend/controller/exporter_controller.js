const exporterService = require("../services/exporter_services");

//REGISTER EXPORTER DETAILS CONTROLLER
exports.registerExporter = async (req, res, next) => {
  try {
    const { username, password, age, firstName, lastName, contactNo, address } =
      req.body;

    const successResExporter = await exporterService.registerExporter(
      username,
      password,
      "Exporter",
      age,
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

//UPDATE EXPORTER DETAILS CONTROLLER
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

//DELETE EXPORTER ACCOUNT CONTROLLER
exports.deleteExporter = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deleteExporterAccount = await exporterService.deleteExporterAccount(
      userId
    );
    res.json({ status: true, success: deleteExporterAccount });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING AQUA CULTURE FARM DETAILS
exports.getAquaFarmDetails = async (req, res, next) => {
  try {
    let aquaFarmDetails = await exporterService.getAllAquaFarms();

    res.json({ status: true, success: aquaFarmDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING INDIVIDUAL FARM DETAILS
exports.getIndividualAquaFarmDetails = async (req, res, next) => {
  try {
    const { farmId } = req.body;
    let aquaFarmDetails = await exporterService.getIndividualFarmDetails(
      farmId
    );

    res.json({ status: true, success: aquaFarmDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
