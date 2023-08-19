const router = require("express").Router();
const farmDashboardController = require("../controller/farmDashboard_controller");

router.get(
  "/farmdashboard/getAquaFarmDetails",
  farmDashboardController.getAllFarmDetails
);

router.get(
  "/farmdashboard/getAllFarmersDetails",
  farmDashboardController.getAllFarmersDetails
);

// GET STOCK AND SIZE TRENDS OVER TIME DATA
router.get(
  "/farmdashboard/getStockAndSizeTrendsOverTime",
  farmDashboardController.getStockAndSizeTrendsOverTime
);

// GET SURVIVAL RATE ANALYSIS DATA
router.get(
  "/farmdashboard/getSurvivalRateAnalysis",
  farmDashboardController.getSurvivalRateAnalysis
);

// GET HATCHERY BATCH PERFORMANCE DATA
router.get(
  "/farmdashboard/getHatcheryBatchPerformance",
  farmDashboardController.getHatcheryBatchPerformance
);

// GET HARVEST SIZE DISTRIBUTION DATA
router.get(
  "/farmdashboard/getHarvestSizeDistribution",
  farmDashboardController.getHarvestSizeDistribution
);

// GET COMPARATIVE ANALYSIS BY HATCHERY DATA
router.get(
  "/farmdashboard/getComparativeAnalysisByHatchery",
  farmDashboardController.getComparativeAnalysisByHatchery
);

// GET STOCKING DENSITY ANALYSIS DATA
router.get(
  "/farmdashboard/getStockingDensityAnalysis",
  farmDashboardController.getStockingDensityAnalysis
);

// GET DISEASE OCCURRENCE ANALYSIS DATA
router.get(
  "/farmdashboard/getDiseaseOccurrenceAnalysis",
  farmDashboardController.getDiseaseOccurrenceAnalysis
);

// GET TIME SERIES ANALYSIS DATA
router.get(
  "/farmdashboard/getTimeSeriesAnalysis",
  farmDashboardController.getTimeSeriesAnalysis
);

// GET GEOSPATIAL ANALYSIS DATA
router.get(
  "/farmdashboard/getGeospatialAnalysis",
  farmDashboardController.getGeospatialAnalysis
);

module.exports = router;
