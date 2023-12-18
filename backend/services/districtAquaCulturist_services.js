const aqFarmingDetailsModel = require("../model/farm/aqFarmingDetails_model");
const aqFarmModel = require("../model/farm/aqFarm_model");
const advertisementModel = require("../model/farm/advertisement_model");
const UserModel = require("../model/user_model");
//FILE SYSTEM
const fs = require("fs");
const path = require("path");

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
    date,
    month
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
        month,
      });
      return await farmingDetails.save();
    } catch (error) {
      throw error;
    }
  }

  //DELETE FARMING STOCK DETAILS
  static async deleteFarmingStockDetails(farmingId) {
    const deleteFarmingStockDetails =
      await aqFarmingDetailsModel.findByIdAndDelete({
        _id: farmingId,
      });
    console.log(farmingId);

    return deleteFarmingStockDetails;
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

  //DELETE FARM DETAILS
  static async deleteIndividualFarmDetails(farmId) {
    const deleteFarmDetails = await aqFarmModel.findByIdAndDelete({
      _id: farmId,
    });
    console.log(farmId);

    if (deleteFarmDetails) {
      const farmPicPath = path.join(
        __dirname,
        "..",
        "Images",
        "farmImages",
        deleteFarmDetails.picture
      );
      console.log(farmPicPath);
      // Check if the file exists before attempting to delete
      if (fs.existsSync(farmPicPath)) {
        fs.unlinkSync(farmPicPath);
        console.log("Farm picture deleted successfully.");
      } else {
        console.log("Farm picture file not found.");
      }
    }

    return deleteFarmDetails;
  }

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
        const stockingDates =
          aquaFarmingDetails.length > 0
            ? aquaFarmingDetails[0].stockingDates
            : null;

        return {
          ...farm.toObject(),
          stock,
          stockingDates,
        };
      })
    );
    // console.log(farmsWithStockDetails);

    return farmsWithStockDetails;
  }

  //GETTING ALL AQUACULTURE FARM DETAILS THAT DOES NOT HAVE A FARMER
  static async getAllAquaFarmsWithoutaFarmer() {
    // Assuming you have a User model for user collection
    const userRole = "Farmer"; // Set the user role filter
    const allAquaFarmDetails = await aqFarmModel.find().sort({ createdAt: -1 });

    // Get the farm names from allAquaFarmDetails
    const farmNames = allAquaFarmDetails.map((farm) => farm.name);

    // Find users with user_role=farmer and farmname in the farmNames array
    const farmersWithSameFarmName = await UserModel.find({
      role: userRole,
      farmName: { $in: farmNames },
    });

    // Get the farm names associated with farmers
    const farmsWithFarmer = farmersWithSameFarmName.map(
      (farmer) => farmer.farmName
    );

    console.log("farmsWithFarmer", farmsWithFarmer);

    // Filter farms without a farmer
    const farmsWithoutFarmer = allAquaFarmDetails.filter(
      (farm) => !farmsWithFarmer.includes(farm.name)
    );

    console.log("farmsWithoutFarmer", farmsWithoutFarmer);

    return farmsWithoutFarmer;
  }

  //GETTING ALL AQUACULTURE FARMing DETAILS
  static async getAllAquaFarming() {
    const allAquaFarmingDetails = await aqFarmingDetailsModel.find();
    return allAquaFarmingDetails;
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
      .sort({ stockingDates: -1 });
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
