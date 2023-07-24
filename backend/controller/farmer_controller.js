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

    const successResExporter = await farmerService.registerFarmer(
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
      "Inactive"
    );

    res.json({ status: true, success: successResExporter });
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

//DELETE FARMER ACCOUNT CONTROLLER
exports.deleteFarmer = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deleteFarmerAccount = await farmerService.deleteFarmerAccount(userId);
    res.json({ status: true, success: deleteFarmerAccount });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//CHANGEPASSWORD
exports.changePassword = async (req, res, next) => {
  try {
    const { userId, oldpassword, newPassword, confirmPassword } = req.body;

    if (oldpassword == "" || newPassword == "" || confirmPassword == "") {
      res.json({ status: "FAILED", message: "Please Enter a value" });
    } else if (newPassword != confirmPassword) {
      res.json({ status: "FAILED", message: "New Password doesn't match" });
    } else {
      let data = await farmerService.getFarmerDetails(userId);

      let oldPasswordDB = data.password;

      bcrypt.compare(oldpassword, oldPasswordDB, function (err, result) {
        if (result) {
          farmerService
            .changePassword(userId, newPassword)
            .then((result) => {
              res.json({ status: true, success: result });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          res.json({ status: true, success: "Error when comparing passwords" });
        }
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
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
