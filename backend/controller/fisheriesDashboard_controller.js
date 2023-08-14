const fisheriesDashboardService = require("../services/fisheriesDashboard_services");

//GET ALL FISHING DETAILS
exports.getAllFishingDetails = async (req, res, next) => {
  try {
    let fishingDetails = await fisheriesDashboardService.getAllFishingDetails();

    if (fishingDetails) {
      res.status(200).json({ status: true, data: fishingDetails });
    } else {
      res
        .status(404)
        .json({ status: false, message: "There are no Fishing details" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET ALL FISHING DETAILS ALONG WITH THE FISHERMAN DETAILS
exports.getAllFishingDetailsWithFishermens = async (req, res, next) => {
  try {
    let fishingAndFishermanDetails =
      await fisheriesDashboardService.getAllFishingDetailsWithFishermens();

    if (fishingAndFishermanDetails) {
      res.status(200).json({ status: true, data: fishingAndFishermanDetails });
    } else {
      res
        .status(404)
        .json({ status: false, message: "There are no Fishing details associated with any fisherman" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET SPECIES TYPE DISTRIBUTION DATA
exports.getSpeciesTypeDistribution = async (req, res, next) => {
  try {
    let speciesTypeDistribution =
      await fisheriesDashboardService.getSpeciesTypeDistribution();

    if (speciesTypeDistribution) {
      res.status(200).json({ status: true, data: speciesTypeDistribution });
    } else {
      res.status(404).json({
        status: false,
        message: "Species type distribution data not available",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET GEAR TYPE DISTRIBUTION DATA
exports.getGearTypeDistribution = async (req, res, next) => {
  try {
    let gearTypeDistribution =
      await fisheriesDashboardService.getGearTypeDistribution();

    if (gearTypeDistribution) {
      res.status(200).json({ status: true, data: gearTypeDistribution });
    } else {
      res.status(404).json({
        status: false,
        message: "Gear type distribution data not available",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET CATCH TRENDS OVER TIME DATA
exports.getCatchTrendsOverTime = async (req, res, next) => {
  try {
    let catchTrendsOverTime =
      await fisheriesDashboardService.getCatchTrendsOverTime();

    if (catchTrendsOverTime) {
      res.status(200).json({ status: true, data: catchTrendsOverTime });
    } else {
      res.status(404).json({
        status: false,
        message: "Catch trends over time data not available",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET FISHING LOCATIONS DATA
exports.getFishingLocationsWithCatchSize = async (req, res, next) => {
  try {
    let fishingLocations =
      await fisheriesDashboardService.getFishingLocationsWithCatchSize();

    if (fishingLocations) {
      res.status(200).json({ status: true, data: fishingLocations });
    } else {
      res.status(404).json({
        status: false,
        message: "Fishing locations data not available",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

// GET CATCH SIZE VS. SPECIES TYPE DATA
exports.getCatchSizeVsSpeciesType = async (req, res, next) => {
  try {
    let catchSizeVsSpeciesType =
      await fisheriesDashboardService.getCatchSizeVsSpeciesType();

    if (catchSizeVsSpeciesType) {
      res.status(200).json({ status: true, data: catchSizeVsSpeciesType });
    } else {
      res.status(404).json({
        status: false,
        message: "Catch size vs. species type data not available",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
