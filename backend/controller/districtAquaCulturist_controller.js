const districtAquaCulturistService = require("../services/districtAquaCulturist_services");

//INSERT FARMING DETAILS
exports.insertFarmingDetails = async (req, res, next) => {
  try {
    const {
      farmId,
      stock,
      stockingDates,
      hatchery,
      hatcheryBatch,
      harvest,
      size,
      survival,
      diseases,
    } = req.body;

    const date = new Date().toISOString();

    let farmingData = await districtAquaCulturistService.insertFarmingDetails(
      farmId,
      stock,
      stockingDates,
      hatchery,
      hatcheryBatch,
      harvest,
      size,
      survival,
      diseases,
      date
    );

    if (farmingData) {
      res.status(200).json({
        success: true,
        message: "Entered Farming details Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while saving farming details ",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//UPDATE FARM DETAILS CONTROLLER
exports.updateFarm = async (req, res, next) => {
  try {
    const {
      farmId,
      name,
      address,
      age,
      licenseNo,
      validity,
      location,
      extend,
      gpsCoordinates,
      farmInternal,
      establishmentDate,
    } = req.body;
    let updateFarmDetails =
      await districtAquaCulturistService.updateFarmDetails(
        farmId,
        name,
        address,
        age,
        licenseNo,
        validity,
        location,
        extend,
        gpsCoordinates,
        farmInternal,
        establishmentDate
      );

    if (updateFarmDetails) {
      res
        .status(200)
        .json({ success: true, message: "Successfully updated farm details" });
    } else {
      res.status(400).json({
        success: false,
        message: "Error while updating farm details ",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING ALL AQUA CULTURE FARM DETAILS
exports.getAllAquaFarmDetails = async (req, res, next) => {
  try {
    let allAquaFarmDetails =
      await districtAquaCulturistService.getAllAquaFarms();

    if (allAquaFarmDetails) {
      res.status(200).json({
        success: true,
        message: "Found All aqua Farm details",
        data: allAquaFarmDetails,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No farm details found ",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//CREATE ADVERTISEMENT FOR VACANCIES OR PROMOTIONS
exports.createAdvertisement = async (req, res, next) => {
  try {
    const { type, title, description, contactNo, address, email } = req.body;

    let createAdvertisement =
      await districtAquaCulturistService.createAdvertisement(
        type,
        title,
        description,
        contactNo,
        address,
        email
      );

    if (createAdvertisement) {
      res.status(200).json({
        success: true,
        message: "Successfully created Advertisement",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error in creating advertisement",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
