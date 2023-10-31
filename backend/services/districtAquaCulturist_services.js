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
    contactNo
  ) {
    const updateFarmDetails = await aqFarmModel.findByIdAndUpdate(
      { _id: farmId },
      {
        name: name,
        licenseNo: licenseNo,
        validity: validity,
        location: location,
        extend: extend,
        gpsCoordinatesOne: gpsCoordinatesOne,
        gpsCoordinatesTwo: gpsCoordinatesTwo,
        gpsCoordinatesThree: gpsCoordinatesThree,
        gpsCoordinatesFour: gpsCoordinatesFour,
        farmInternal: farmInternal,
        establishmentDate: establishmentDate,
        contactNo: contactNo,
      }
    );
    return updateFarmDetails;
  }

  // //GETTING ALL AQUACULTURE FARM DETAILS
  // static async getAllAquaFarms() {
  //   const allAquaFarmDetails = await aqFarmModel.find().sort({ createdAt: -1 });
  //   return allAquaFarmDetails;
  // }

  //GETTING ALL AQUACULTURE FARM DETAILS
  static async getAllAquaFarms() {
    const allAquaFarmDetails = await aqFarmModel.find().sort({ createdAt: -1 });

    // Fetch stock details for each farm
    const farmsWithStockDetails = await Promise.all(
      allAquaFarmDetails.map(async (farm) => {
        const aquaFarmingDetails = await aqFarmingDetailsModel
          .find({ farmId: farm._id })
          .sort({ date: -1 })
          .limit(1);

        const stock =
          aquaFarmingDetails.length > 0 ? aquaFarmingDetails[0].stock : null;

        return {
          ...farm.toObject(),
          stock,
        };
      })
    );
    console.log(farmsWithStockDetails);

    return farmsWithStockDetails;
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

  //GETTING FARMING DETAILS OF A INDIVIDUAL FARM
  static async getAllAquaFarmingDetailsSingelFarm(farmId) {
    const getAllAquaFarmingDetails = await aqFarmingDetailsModel
      .find({
        farmId: farmId,
      })
      .sort({ date: -1 });
    return getAllAquaFarmingDetails;
  }

  //GETTING FARMING DETAILS OF A INDIVIDUAL FARM
  static async getFarmingDetailsFromFarmingId(farmingId) {
    const getAquaFarmingDetails = await aqFarmingDetailsModel.find({
      _id: farmingId,
    });
    return getAquaFarmingDetails;
  }

  //CREATE ADVERTISEMENT FOR VACANCIES AND PROMOTIONS
  static async createAdvertisement(
    type,
    title,
    description,
    contactNo,
    address,
    email,
    createdAt,
    postedById
  ) {
    try {
      const createAdvertisement = new advertisementModel({
        type,
        postedById,
        title,
        description,
        contactNo,
        address,
        email,
        createdAt,
        postedById,
      });
      return await createAdvertisement.save();
    } catch (error) {
      throw error;
    }
  }

  //DELETE ADVERTISEMENT FOR VACANCIES AND PROMOTIONS
  static async deleteAdvertisement(ad_Id) {
    const deleteAdvertisement = await advertisementModel.findByIdAndDelete(
      ad_Id
    );
    return deleteAdvertisement;
  }
}

module.exports = districtAquaCulturistService;
