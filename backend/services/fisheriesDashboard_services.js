/* FISHING SECTION DASHBOARD */

const FishingModel = require("../model/fisheries/fishing_model");

class FisheriesDashboardService {
  //GET ALL FISHING DETAILS
  static async getAllFishingDetails() {
    const allFishingDetails = await FishingModel.find();
    return allFishingDetails;
  }

  //GET ALL FISHING DETAILS ALONG WITH ALL THE FISHERMEN DETAILS ASSOCIATED WITH IT
  static async getAllFishingDetailsWithFishermens() {
    const allFishingDetailsWithFishermens = await FishingModel.find().populate(
      "fishermanId"
    );
    return allFishingDetailsWithFishermens;
  }

  // GET SPECIES TYPE DISTRIBUTION DATA
  static async getSpeciesTypeDistribution() {
    const speciesTypeDistribution = await FishingModel.aggregate([
      {
        $group: {
          _id: "$speciesType",
          count: { $sum: 1 },
        },
      },
    ]);
    return speciesTypeDistribution;
  }

  // GET GEAR TYPE DISTRIBUTION DATA
  static async getGearTypeDistribution() {
    const gearTypeDistribution = await FishingModel.aggregate([
      {
        $group: {
          _id: "$gearType",
          count: { $sum: 1 },
        },
      },
    ]);
    return gearTypeDistribution;
  }

  // GET CATCH TRENDS OVER TIME DATA
  static async getCatchTrendsOverTime() {
    const catchTrendsOverTime = await FishingModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    return catchTrendsOverTime;
  }

  // GET FISHING LOCATIONS DATA
  static async getFishingLocationsWithCatchSize() {
    const fishingLocationsWithCatchSize = await FishingModel.find(
      {},
      "location size"
    );
    return fishingLocationsWithCatchSize;
  }

  // GET CATCH SIZE VS. SPECIES TYPE DATA
  static async getCatchSizeVsSpeciesType() {
    const catchSizeVsSpeciesType = await FishingModel.find(
      {},
      "size speciesType"
    );
    return catchSizeVsSpeciesType;
  }
}

module.exports = FisheriesDashboardService;
