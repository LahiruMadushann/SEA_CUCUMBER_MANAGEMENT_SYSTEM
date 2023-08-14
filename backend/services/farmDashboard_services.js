/* FARM SECTION DASHBOARD */

const FarmModel = require("../model/farm/aqFarm_model");
const FarmingModel = require("../model/farm/aqFarmingDetails_model");
const UserModel = require("../model/user_model");

class FarmDashboardService {
  //GET ALL FARM DETAILS
  static async getAllFarmDetails() {
    const allFarmDetails = await FarmModel.find();
    // console.log(allFarmDetails);
    return allFarmDetails;
  }

  //GET ALL FARMERS DETAILS
  static async getAllFarmersDetails() {
    const allFarmersDetails = await UserModel.find({ role: "Farmer" });
    return allFarmersDetails;
  }

  // GET STOCK AND SIZE TRENDS OVER TIME DATA
  static async getStockAndSizeTrendsOverTime() {
    const stockAndSizeTrendsOverTime = await FarmingModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          averageStock: { $avg: "$stock" },
          averageSize: { $avg: "$size" },
        },
      },
    ]);
    return stockAndSizeTrendsOverTime;
  }

  // GET SURVIVAL RATE ANALYSIS DATA
  static async getSurvivalRateAnalysis() {
    const survivalRateAnalysis = await FarmingModel.aggregate([
      {
        $group: {
          _id: null,
          totalSurvival: { $sum: "$survival" },
          totalStock: { $sum: "$stock" },
        },
      },
      {
        $project: {
          _id: 0,
          survivalRate: { $divide: ["$totalSurvival", "$totalStock"] },
        },
      },
    ]);
    return survivalRateAnalysis;
  }
  // GET HATCHERY BATCH PERFORMANCE DATA
  static async getHatcheryBatchPerformance() {
    const hatcheryBatchPerformance = await FarmingModel.aggregate([
      {
        $group: {
          _id: "$hatcheryBatch",
          averageSize: { $avg: "$size" },
          averageSurvival: { $avg: "$survival" },
          averageDiseaseOccurrence: {
            $avg: { $cond: { if: "$diseases", then: 1, else: 0 } },
          },
        },
      },
    ]);
    return hatcheryBatchPerformance;
  }

  // GET HARVEST SIZE DISTRIBUTION DATA
  static async getHarvestSizeDistribution() {
    const harvestSizeDistribution = await FarmingModel.find({}, "harvest size");
    return harvestSizeDistribution;
  }

  // GET COMPARATIVE ANALYSIS BY HATCHERY DATA
  static async getComparativeAnalysisByHatchery() {
    const comparativeAnalysisByHatchery = await FarmingModel.aggregate([
      {
        $group: {
          _id: "$hatchery",
          averageSurvival: { $avg: "$survival" },
          averageHarvestSize: { $avg: "$harvest" },
          averageDiseaseOccurrence: {
            $avg: { $cond: { if: "$diseases", then: 1, else: 0 } },
          },
        },
      },
    ]);
    return comparativeAnalysisByHatchery;
  }

  // GET STOCKING DENSITY ANALYSIS DATA
  static async getStockingDensityAnalysis() {
    const stockingDensityAnalysis = await FarmingModel.aggregate([
      {
        $group: {
          _id: "$stockingDensity",
          averageSize: { $avg: "$size" },
          averageSurvival: { $avg: "$survival" },
          averageDiseaseOccurrence: {
            $avg: { $cond: { if: "$diseases", then: 1, else: 0 } },
          },
        },
      },
    ]);
    return stockingDensityAnalysis;
  }

  // GET DISEASE OCCURRENCE ANALYSIS DATA
  static async getDiseaseOccurrenceAnalysis() {
    const diseaseOccurrenceAnalysis = await FarmingModel.aggregate([
      {
        $match: {
          diseases: { $exists: true },
        },
      },
      {
        $group: {
          _id: null,
          totalDiseases: { $sum: 1 },
          averageSurvival: { $avg: "$survival" },
          averageStock: { $avg: "$stock" },
        },
      },
      {
        $project: {
          _id: 0,
          totalDiseases: 1,
          averageSurvival: 1,
          averageStock: 1,
        },
      },
    ]);
    return diseaseOccurrenceAnalysis;
  }

  // GET TIME SERIES ANALYSIS DATA
  static async getTimeSeriesAnalysis() {
    const timeSeriesAnalysis = await FarmingModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          averageSurvival: { $avg: "$survival" },
          averageSize: { $avg: "$size" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    return timeSeriesAnalysis;
  }

  // GET GEOSPATIAL ANALYSIS DATA
  static async getGeospatialAnalysis() {
    const geospatialAnalysis = await FarmingModel.find().populate("farmId");
    return geospatialAnalysis;
  }
}

module.exports = FarmDashboardService;
