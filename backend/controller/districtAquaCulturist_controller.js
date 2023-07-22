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

    let farmingData = await districtAquaCulturistService.insertFarmingDetails(
      farmId,
      stock,
      stockingDates,
      hatchery,
      hatcheryBatch,
      harvest,
      size,
      survival,
      diseases
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
