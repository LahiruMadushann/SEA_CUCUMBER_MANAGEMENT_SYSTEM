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
      return res
        .status(400)
        .json({ success: false, message: "you must select a file" });
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

    if (successResExporter) {
      res
        .status(200)
        .json({ success: true, message: "Registration Successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Registration Unsuccessful" });
    }
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

    if (updateExporterDetails) {
      res.status(200).json({ success: true, message: "Updated Successfully" });
    } else {
      res.status(400).json({ success: false, message: "Update Unsuccessful" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING AQUA CULTURE FARM DETAILS
exports.getAquaFarmDetails = async (req, res, next) => {
  try {
    let aquaAllFarmDetails = await exporterService.getAllAquaFarms();

    if (aquaAllFarmDetails) {
      res.status(200).json({
        success: true,
        message: "Found All farm details",
        data: aquaAllFarmDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No farm details found" });
    }
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

    if (aquaFarmDetails) {
      res.status(200).json({
        success: true,
        message: "Found farm details",
        data: aquaFarmDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No farm details found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING FISH PROCESSORS DETAILS
exports.getFishProcessorsDetails = async (req, res, next) => {
  try {
    let allFishProcessorDetails = await exporterService.getAllFishProcessors();

    if (allFishProcessorDetails) {
      res.status(200).json({
        success: true,
        message: "Found all Fish Processor details",
        data: allFishProcessorDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No Fish Processor details found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING INDIVIDUAL FISH PROCESSORS DETAILS
exports.getIndividualFishProcessorsDetails = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let fishProcessorDetails = await exporterService.getindividualFishProcessor(
      userId
    );

    if (fishProcessorDetails) {
      res.status(200).json({
        success: true,
        message: "Found Fish Processor details",
        data: fishProcessorDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No Fish Processor details found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
