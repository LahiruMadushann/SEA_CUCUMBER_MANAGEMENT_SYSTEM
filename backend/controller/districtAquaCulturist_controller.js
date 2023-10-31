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
    const date1 = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date1.getMonth()]; // get current month name

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
      date,
      month
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
      licenseNo,
      validity,
      location,
      extend,
      gpsCoordinatesOne,
      gpsCoordinatesTwo,
      gpsCoordinatesThree,
      gpsCoordinatesFour,
      farmInternal,
      establishmentDate,
      contactNo,
    } = req.body;
    let updateFarmDetails =
      await districtAquaCulturistService.updateFarmDetails(
        farmId,
        name,
        licenseNo,
        validity,
        location,
        extend,
        gpsCoordinatesOne,
        gpsCoordinatesTwo,
        gpsCoordinatesThree,
        gpsCoordinatesFour,
        farmInternal,
        establishmentDate,
        contactNo,
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

//GETTING ALL AQUA Farming DETAILS
exports.getAllAquaFarmingDetails = async (req, res, next) => {
  try {
    let allAquaFarmingDetails =
      await districtAquaCulturistService.getAllAquaFarming();

    if (allAquaFarmingDetails) {
      res.status(200).json({
        success: true,
        message: "Found All aqua Farm details",
        data: allAquaFarmingDetails,
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

//GETTING INDIVIDUAL AQUACULTURE FARM DETAIL
exports.getIndividualAquaFarmDetail = async (req, res, next) => {
  try {
    const { farmId } = req.body;
    let aquaFarmDetails = await districtAquaCulturistService.getAquaFarmDetails(
      farmId
    );

    if (aquaFarmDetails) {
      res.status(200).json({
        success: true,
        message: "Found aqua Farm details",
        data: aquaFarmDetails,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No farm details found for the Id",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING INDIVIDUAL LATEST FARMING DETAILS AQUACULTURE FARM DETAILS
exports.getIndividualAquaFarmingDetails = async (req, res, next) => {
  try {
    const { farmId } = req.body;
    let aquaFarmingDetails =
      await districtAquaCulturistService.getAquaFarmingDetails(farmId);

    if (aquaFarmingDetails) {
      res.status(200).json({
        success: true,
        message: "Found aqua Farming details",
        data: aquaFarmingDetails,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No farming details found for the Id",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING INDIVIDUAL FARMING DETAILS FROM AQUACULTURE FARM ID
exports.getIndividualAquaAllFarmingDetails = async (req, res, next) => {
  try {
    const { farmId } = req.body;
    let aquaFarmingDetails =
      await districtAquaCulturistService.getAllAquaFarmingDetailsSingelFarm(
        farmId
      );

    if (aquaFarmingDetails) {
      res.status(200).json({
        success: true,
        message: "Found aqua Farming details",
        data: aquaFarmingDetails,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No farming details found for the Id",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING INDIVIDUAL FARMING DETAILS FROM FARMING ID
exports.getIndividualFarmingDetails = async (req, res, next) => {
  try {
    const { farmingId } = req.body;
    let aquaFarmingDetails =
      await districtAquaCulturistService.getFarmingDetailsFromFarmingId(
        farmingId
      );

    if (aquaFarmingDetails) {
      res.status(200).json({
        success: true,
        message: "Found aqua Farming details",
        data: aquaFarmingDetails,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No farming details found for the Id",
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
    const { type, title, description, contactNo, address, email, postedById } =
      req.body;

    const createdAt = new Date().toISOString();

    let createAdvertisement =
      await districtAquaCulturistService.createAdvertisement(
        type,
        title,
        description,
        contactNo,
        address,
        email,
        createdAt,
        postedById
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

//DELETE ADVERTISEMENT FOR VACANCIES OR PROMOTIONS
exports.deleteAdvertisement = async (req, res, next) => {
  try {
    const { ad_Id } = req.body;

    let deleteAdvertisement =
      await districtAquaCulturistService.deleteAdvertisement(ad_Id);

    if (deleteAdvertisement) {
      res.status(200).json({
        success: true,
        message: "Successfully deleted Advertisement",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error in deleting advertisement",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
