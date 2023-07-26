const exporterService = require("../services/exporter_services");

//REGISTER EXPORTER DETAILS CONTROLLER
exports.registerExporter = async (req, res, next) => {
  try {
    const {
      username,
      password,
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
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const profilepic = req.file.filename;

    const createdAt = new Date().toISOString();

    const successResExporter = await exporterService.registerExporter(
      username,
      password,
      "Exporter",
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

//GETTING FISH PROCESSORS DETAILS
exports.getFishProcessorsDetails = async (req, res, next) => {
  try {
    let fishProcessorDetails = await exporterService.getAllFishProcessors();

    res.json({ status: true, success: fishProcessorDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING INDIVIDUAL FISH PROCESSORS DETAILS
exports.getIndividualFishProcessorsDetails = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let FishProcessorDetails = await exporterService.getindividualFishProcessor(
      userId
    );

    res.json({ status: true, success: FishProcessorDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
