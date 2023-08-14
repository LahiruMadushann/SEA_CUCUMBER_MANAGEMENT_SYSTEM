const farmDashboardService = require("../services/farmDashboard_services");

//GET ALL FARM DETAILS
exports.getAllFarmDetails = async (req, res, next) => {
  try {
    let aquaFarmDetails = await farmDashboardService.getAllFarmDetails();

    if (aquaFarmDetails) {
      res.status(200).json({ status: true, data: aquaFarmDetails });
    } else {
      res
        .status(404)
        .json({ status: false, message: "There are no Farm details" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GET ALL FARMERS DETAILS
exports.getAllFarmersDetails = async (req, res, next) => {
  try {
    let aquaFarmersDetails = await farmDashboardService.getAllFarmersDetails();

    if (aquaFarmersDetails) {
      res.status(200).json({ status: true, data: aquaFarmersDetails });
    } else {
      res
        .status(404)
        .json({ status: false, message: "There are no Farmers Registered" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET STOCK AND SIZE TRENDS OVER TIME DATA
exports.getStockAndSizeTrendsOverTime = async (req, res, next) => {
  try {
    let stockAndSizeTrends =
      await farmDashboardService.getStockAndSizeTrendsOverTime();

    if (stockAndSizeTrends) {
      res.status(200).json({ status: true, data: stockAndSizeTrends });
    } else {
      res
        .status(404)
        .json({
          status: false,
          message: "No stock and size trends data available",
        });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET SURVIVAL RATE ANALYSIS DATA
exports.getSurvivalRateAnalysis = async (req, res, next) => {
  try {
    let survivalRateAnalysis =
      await farmDashboardService.getSurvivalRateAnalysis();

    if (survivalRateAnalysis) {
      res.status(200).json({ status: true, data: survivalRateAnalysis });
    } else {
      res
        .status(404)
        .json({
          status: false,
          message: "No survival rate analysis data available",
        });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET HATCHERY BATCH PERFORMANCE DATA
exports.getHatcheryBatchPerformance = async (req, res, next) => {
  try {
    let hatcheryBatchPerformance =
      await farmDashboardService.getHatcheryBatchPerformance();

    if (hatcheryBatchPerformance) {
      res.status(200).json({ status: true, data: hatcheryBatchPerformance });
    } else {
      res
        .status(404)
        .json({
          status: false,
          message: "No hatchery batch performance data available",
        });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET HARVEST SIZE DISTRIBUTION DATA
exports.getHarvestSizeDistribution = async (req, res, next) => {
  try {
    let harvestSizeDistribution =
      await farmDashboardService.getHarvestSizeDistribution();

    if (harvestSizeDistribution) {
      res.status(200).json({ status: true, data: harvestSizeDistribution });
    } else {
      res
        .status(404)
        .json({
          status: false,
          message: "No harvest size distribution data available",
        });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET COMPARATIVE ANALYSIS BY HATCHERY DATA
exports.getComparativeAnalysisByHatchery = async (req, res, next) => {
  try {
    let comparativeAnalysis =
      await farmDashboardService.getComparativeAnalysisByHatchery();

    if (comparativeAnalysis) {
      res.status(200).json({ status: true, data: comparativeAnalysis });
    } else {
      res
        .status(404)
        .json({
          status: false,
          message: "No comparative analysis data available",
        });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET STOCKING DENSITY ANALYSIS DATA
exports.getStockingDensityAnalysis = async (req, res, next) => {
  try {
    let stockingDensityAnalysis =
      await farmDashboardService.getStockingDensityAnalysis();

    if (stockingDensityAnalysis) {
      res.status(200).json({ status: true, data: stockingDensityAnalysis });
    } else {
      res
        .status(404)
        .json({
          status: false,
          message: "No stocking density analysis data available",
        });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET DISEASE OCCURRENCE ANALYSIS DATA
exports.getDiseaseOccurrenceAnalysis = async (req, res, next) => {
  try {
    let diseaseOccurrenceAnalysis =
      await farmDashboardService.getDiseaseOccurrenceAnalysis();

    if (diseaseOccurrenceAnalysis) {
      res.status(200).json({ status: true, data: diseaseOccurrenceAnalysis });
    } else {
      res.status(404).json({
        status: false,
        message: "No disease occurrence data available",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET TIME SERIES ANALYSIS DATA
exports.getTimeSeriesAnalysis = async (req, res, next) => {
  try {
    let timeSeriesAnalysis = await farmDashboardService.getTimeSeriesAnalysis();

    if (timeSeriesAnalysis) {
      res.status(200).json({ status: true, data: timeSeriesAnalysis });
    } else {
      res.status(404).json({
        status: false,
        message: "No time series analysis data available",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET GEOSPATIAL ANALYSIS DATA
exports.getGeospatialAnalysis = async (req, res, next) => {
  try {
    let geospatialAnalysis = await farmDashboardService.getGeospatialAnalysis();

    if (geospatialAnalysis) {
      res.status(200).json({ status: true, data: geospatialAnalysis });
    } else {
      res.status(404).json({
        status: false,
        message: "No geospatial analysis data available",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
