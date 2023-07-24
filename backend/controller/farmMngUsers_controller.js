const farmMngUserService = require("../services/farmMngUsers_services");
const bcrypt = require("bcrypt");

exports.updatefarmMngUsers = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, age, contactNo, address } = req.body;
    let updatefarmMngUserDetail =
      await farmMngUserService.updateFarmMngUserDetails(
        userId,
        firstName,
        lastName,
        age,
        contactNo,
        address
      );
    res.json({ status: true, success: updatefarmMngUserDetail });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//DELETE FARM MNG USER ACCOUNT CONTROLLER
exports.deleteFarmMngUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deleteFarmMngUserAccount =
      await farmMngUserService.deleteAquaMngUserAccount(userId);
    res.json({ status: true, success: deleteFarmMngUserAccount });
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
      let data = await farmMngUserService.getAquaFarmUserDetails(userId);

      let oldPasswordDB = data.password;

      bcrypt.compare(oldpassword, oldPasswordDB, function (err, result) {
        if (result) {
          farmMngUserService
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

//ENTER NEWS / RULES AND REGULATIONS
exports.enterNews = async (req, res, next) => {
  try {
    const { userId, description, type, date, postedTo } = req.body;

    let data = await farmMngUserService.getAquaFarmUserDetails(userId);

    let postedBy = data.firstName;
    let role = data.role;

    const successEnteredNews =
      await farmMngUserService.enterNewsRulesRegulations(
        description,
        type,
        date,
        role,
        postedBy,
        postedTo
      );

    res.json({ status: true, success: "News Posted successfully" });
  } catch (error) {
    next(error);
  }
};

//ENTER NEWS / RULES AND REGULATIONS
exports.enterSeacucumberRates = async (req, res, next) => {
  try {
    const { userId, title, description, speciesType, rates, date, postedTo } =
      req.body;

    let data = await farmMngUserService.getAquaFarmUserDetails(userId);

    let postedBy = data.firstName;
    let role = data.role;
    let type = "SeacucumberRates";

    const successEnteredSeacucumberRates =
      await farmMngUserService.enterSeaCucumberRates(
        title,
        description,
        type,
        speciesType,
        rates,
        date,
        role,
        postedBy,
        postedTo
      );

    res.json({ status: true, success: "Rates Entered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.registerFarm = async (req, res, next) => {
  try {
    const {
      name,
      address,
      age,
      licenseNo,
      validity,
      location,
      extend,
      gpsCoordinates,
      farmInternal,
      establishmentDate,
    } = req.body;

    const successResFarm = await farmMngUserService.registerFarm(
      name,
      address,
      age,
      "Farm",
      licenseNo,
      validity,
      location,
      extend,
      gpsCoordinates,
      farmInternal,
      establishmentDate
    );

    res.json({ status: true, success: "Farm registered successfully" });
  } catch (error) {
    next(error);
  }
};
