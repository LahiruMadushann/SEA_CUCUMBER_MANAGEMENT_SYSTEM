const aqFarmingDetailsModel = require("../model/farm/aqFarmingDetails_model");
const aqFarmModel = require("../model/farm/aqFarm_model");
const advertisementModel = require("../model/farm/advertisement_model");

class districtAquaCulturistService {
  static async insertFarmingDetails(
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
        date,
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
    return updateFarmDetails;
  }

  //GETTING ALL AQUACULTURE FARM DETAILS
  static async getAllAquaFarms() {
    const allAquaFarmDetails = await aqFarmModel.find();
    return allAquaFarmDetails;
  }

  //GETTING INDIVIDUAL AQUACULTURE FARM DETAIL
  static async getAquaFarmDetails(farmId) {
    const getAquaFarmDetails = await aqFarmModel.findById(farmId);
    return getAquaFarmDetails;
  }

  //GETTING LATEST FARMING DETAILS OF A INDIVIDUAL FARM
  static async getAquaFarmingDetails(farmId) {
    const getAquaFarmingDetails = await aqFarmingDetailsModel
      .find({
        farmId: farmId,
      })
      .sort({ date: -1 })
      .limit(1);
    return getAquaFarmingDetails;
  }

  //CREATE ADVERTISEMENT FOR VACANCIES AND PROMOTIONS
  static async createAdvertisement(
    type,
    title,
    description,
    contactNo,
    address,
    email
  ) {
    try {
      const createAdvertisement = new advertisementModel({
        type,
        title,
        description,
        contactNo,
        address,
        email,
      });
      return await createAdvertisement.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = districtAquaCulturistService;
