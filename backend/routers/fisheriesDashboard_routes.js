const router = require("express").Router();
const fisheriesDashboardController = require("../controller/fisheriesDashboard_controller");

// GET ALL FISHING DETAILS
router.get(
  "/fisheriesdashboard/getAllFishingDetails",
  fisheriesDashboardController.getAllFishingDetails
);

// GET ALL FISHING DETAILS ALONG WITH THE FISHERMAN DETAILS
router.get(
  "/fisheriesdashboard/getAllFishingDetailsWithFishermens",
  fisheriesDashboardController.getAllFishingDetailsWithFishermens
);

// GET ALL FISHING DETAILS 
router.get(
  "/fisheriesdashboard/getAllFishingDetails",
  fisheriesDashboardController.getAllFishingDetails
);


// GET SPECIES TYPE DISTRIBUTION DATA
router.get(
  "/fisheriesdashboard/getSpeciesTypeDistribution",
  fisheriesDashboardController.getSpeciesTypeDistribution
);

// GET GEAR TYPE DISTRIBUTION DATA
router.get(
  "/fisheriesdashboard/getGearTypeDistribution",
  fisheriesDashboardController.getGearTypeDistribution
);

// GET CATCH TRENDS OVER TIME DATA
router.get(
  "/fisheriesdashboard/getCatchTrendsOverTime",
  fisheriesDashboardController.getCatchTrendsOverTime
);

// GET FISHING LOCATIONS DATA
router.get(
  "/fisheriesdashboard/getFishingLocationsWithCatchSize",
  fisheriesDashboardController.getFishingLocationsWithCatchSize
);

// GET CATCH SIZE VS. SPECIES TYPE DATA
router.get(
  "/fisheriesdashboard/getCatchSizeVsSpeciesType",
  fisheriesDashboardController.getCatchSizeVsSpeciesType
);

module.exports = router;
