const aqFarmingDetailsModel = require("../model/farm/aqFarmingDetails_model");

class districtAquaCulturistService {

  //UPDATE FARMING DETAILS
  static async insertFarmingDetails(
    farmId,
    stock,
    stockingDates,
    hatchery,
    hatcheryBatch,
    harvest,
    size,
    survival,
    diseases
  ) {
    try {
      const farmingDetails = new aqFarmingDetailsModel({
        farmId,
        stock,
        stockingDates,
        hatchery,
        hatcheryBatch,
        harvest,
        size,
        survival,
        diseases,
      });
      return await farmingDetails.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = districtAquaCulturistService;
