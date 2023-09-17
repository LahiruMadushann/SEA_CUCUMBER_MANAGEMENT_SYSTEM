const fishermanService = require("../services/fisherman_services");
const bcrypt = require("bcrypt");

//REGISTER FISHERMAN DETAILS CONTROLLER
exports.registerFisherman = async (req, res, next) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      age,
      gender,
      email,
      nicNo,
      contactNo,
      address,
      town,
      province,
      country,
      accountType,
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const profilepic = req.file.filename;
    const createdAt = new Date().toISOString();

    const successResFarmer = await fishermanService.registerFisherman(
      username,
      password,
      "Fisherman",
      firstName,
      lastName,
      age,
      gender,
      email,
      nicNo,
      contactNo,
      address,
      town,
      province,
      country,
      "Inactive",
      accountType,
      profilepic,
      createdAt
    );

    if (successResFarmer) {
      res
        .status(200)
        .json({ success: true, message: "Registration Successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Registration Unsuccessful" });
    }
  } catch (error) {
    next(error);
  }
};

//ENTER FISHING DETAILS
exports.enterFishingDetails = async (req, res, next) => {
  try {
    const { userId, location, size, speciesType, gearType, date } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const fishingImage = req.file.filename;

    const enteringFishingDetails = await fishermanService.enterFishingDetails(
      userId,
      location,
      size,
      speciesType,
      gearType,
      date,
      fishingImage
    );

    if (enteringFishingDetails) {
      res.status(200).json({
        success: true,
        message: "Fishing Details Entered Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Fishing Details Entered Unsuccessful",
      });
    }
  } catch (error) {
    next(error);
  }
};
