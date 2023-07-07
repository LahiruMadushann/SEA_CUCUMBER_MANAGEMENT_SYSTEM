const aqFarmModel = require("../model/farm/aqFarm_model");
const aqFarmingDetailsModel = require("../model/farm/aqFarmingDetails_model");

class FarmService {
  static async registerFarm(
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
    role
  ) {
    try {
      const createFarm = new aqFarmModel({
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
        role,
      });

      return await createFarm.save();
    } catch (err) {
      throw err;
    }
  }

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

module.exports = FarmService;
