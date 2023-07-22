const aqFarmingDetailsModel = require("../model/farm/aqFarmingDetails_model");
const aqFarmModel = require("../model/farm/aqFarm_model");

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

  //UPDATE FARM INFORMATION
  static async updateFarmDetails(
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
  ) {
    const updateFarmDetails = await aqFarmModel.findByIdAndUpdate(
      { _id: farmId },
      {
        name: name,
        address: address,
        age: age,
        licenseNo: licenseNo,
        validity: validity,
        location: location,
        extend: extend,
        gpsCoordinates: gpsCoordinates,
        farmInternal: farmInternal,
        establishmentDate: establishmentDate,
      }
    );
    return "Successfully updated Farm details";
  }
}

module.exports = districtAquaCulturistService;
