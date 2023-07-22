const districtAquaCulturistService = require("../services/districtAquaCulturist_services");

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
