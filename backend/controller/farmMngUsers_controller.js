const farmMngUserService = require("../services/farmMngUsers_services");
const bcrypt = require("bcrypt");
const emailService = require("../services/email_services");

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

    if (updatefarmMngUserDetail) {
      res.status(200).json({ success: true, message: "Update successfully" });
    } else {
      res.status(400).json({ success: false, message: "update Unsuccessful" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//ENTER NEWS / RULES AND REGULATIONS
exports.enterNews = async (req, res, next) => {
  try {
    const { userId, title, description, type, postedTo } = req.body;

    let data = await farmMngUserService.getAquaFarmUserDetails(userId);

    if (data) {
      let postedBy = data.firstName;
      let role = data.role;
      const date = new Date().toISOString();
      let postedById = data._id;

      const successEnteredNews =
        await farmMngUserService.enterNewsRulesRegulations(
          title,
          description,
          type,
          date,
          role,
          postedBy,
          postedTo,
          postedById
        );

      if (successEnteredNews) {
        res
          .status(200)
          .json({ success: true, message: "News Posted successfully" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "News posted Unsuccessful" });
      }
    } else {
      res.status(400).json({ success: false, message: "Author not found" });
    }
  } catch (error) {
    next(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//ENTER NEWS / RULES AND REGULATIONS
exports.enterSeacucumberRates = async (req, res, next) => {
  try {
    const { userId, title, description, speciesType, rates, postedTo } =
      req.body;

    let data = await farmMngUserService.getAquaFarmUserDetails(userId);

    if (data) {
      let postedBy = data.firstName;
      let role = data.role;
      let type = "SeacucumberRates";
      let postedById = data._id;

      const date = new Date().toISOString();

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
          postedTo,
          postedById
        );

      if (successEnteredSeacucumberRates) {
        res
          .status(200)
          .json({ success: true, message: "Rates Entered successfully" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Rates Entered Unsuccessful" });
      }
    } else {
      res.status(400).json({ success: false, message: "Author not found" });
    }
  } catch (error) {
    next(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//DELETE NEWS
exports.deleteNews = async (req, res, next) => {
  try {
    const { news_Id } = req.body;

    let deleteNews = await farmMngUserService.deleteNews(news_Id);

    if (deleteNews) {
      res.status(200).json({
        success: true,
        message: "Successfully deleted Advertisement",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error in deleting advertisement",
      });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.registerFarm = async (req, res, next) => {
  try {
    const {
      name,
      licenseNo,
      validity,
      location,
      extend,
      gpsCoordinatesOne,
      gpsCoordinatesTwo,
      gpsCoordinatesThree,
      gpsCoordinatesFour,
      farmInternal,
      establishmentDate,
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const picture = req.file.filename;

    const date = new Date().toISOString();

    const successResFarm = await farmMngUserService.registerFarm(
      name,
      licenseNo,
      validity,
      location,
      extend,
      gpsCoordinatesOne,
      gpsCoordinatesTwo,
      gpsCoordinatesThree,
      gpsCoordinatesFour,
      farmInternal,
      establishmentDate,
      date,
      picture
    );
    if (successResFarm) {
      res
        .status(200)
        .json({ success: true, message: "Farm registered successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Farm registration Unsuccessfully" });
    }
  } catch (error) {
    next(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
