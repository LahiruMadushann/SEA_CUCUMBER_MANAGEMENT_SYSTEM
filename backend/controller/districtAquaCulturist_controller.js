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
    res.json({ status: true, success: farmingData });
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
    res.json({ status: true, success: updateFarmDetails });
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

    res.json({ status: true, success: allAquaFarmDetails });
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
    res.json({ status: true, success: createAdvertisement });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
