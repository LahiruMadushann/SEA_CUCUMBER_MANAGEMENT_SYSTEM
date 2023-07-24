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
