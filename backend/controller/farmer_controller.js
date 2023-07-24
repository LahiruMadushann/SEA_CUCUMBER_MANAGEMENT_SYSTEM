const farmerService = require("../services/farmer_services");
const bcrypt = require("bcrypt");

//REGISTER EXPORTER DETAILS CONTROLLER
exports.registerFarmer = async (req, res, next) => {
  try {
    const {
      username,
      password,
      subRole,
      firstName,
      lastName,
      age,
      gender,
      contactNo,
      address,
      farmName,
      farmId,
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const profilepic = req.file.filename;

    const successResFarmer = await farmerService.registerFarmer(
      username,
      password,
      "Farmer",
      subRole,
      firstName,
      lastName,
      age,
      gender,
      contactNo,
      address,
      farmName,
      farmId,
      "Inactive",
      profilepic
    );

    res.json({ status: true, success: successResFarmer });
  } catch (error) {
    next(error);
  }
};

//UPDATE FARMER DETAILS CONTROLLER
exports.updateFarmer = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, age, contactNo, address } = req.body;
    let updateExporterDetails = await farmerService.updateFarmerDetails(
      userId,
      firstName,
      lastName,
      age,
      contactNo,
      address
    );
    res.json({ status: true, success: updateExporterDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING AQUA CULTURE FARM DETAILS
exports.getAquaFarmDetails = async (req, res, next) => {
  try {
    let aquaFarmDetails = await farmerService.getAllAquaFarms();

    res.json({ status: true, success: aquaFarmDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING AQUACULTURE FARM NEWS
exports.getAquaFarmNews = async (req, res, next) => {
  try {
    let aquaFarmNews = await farmerService.getAquaFarmsNews();

    res.json({ status: true, success: aquaFarmNews });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
