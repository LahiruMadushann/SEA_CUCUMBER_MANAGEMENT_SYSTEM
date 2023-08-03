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
