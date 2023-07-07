const FarmService = require("../services/farm_services");

exports.registerExporter = async (req, res, next) => {
  try {
    const {
      username,
      password,
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

    const successResFarm = await FarmService.registerFarm(
      username,
      password,
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
      "farm"
    );

    res.json({ status: true, success: "Farm registered successfully" });
  } catch (error) {
    next(error);
  }
};

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

    let farmingData = await FarmService.insertFarmingDetails(
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
