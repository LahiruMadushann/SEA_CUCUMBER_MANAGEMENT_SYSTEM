const fishermanService = require("../services/fisherman_services");
const bcrypt = require("bcrypt");
const emailService = require("../services/email_services");
const userService = require("../services/user_services");

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
      fisheriesArea,
      divingLicenseNo,
      fisheriesRegNo,
      boatRegNo,
    } = req.body;

    if (req.file === undefined) {
      return res.json({ success: false, message: "you must select a file" });
    }

    let checkUser = await userService.validateReg(
      username,
      email,
      contactNo,
      nicNo
    );

    console.log(checkUser);
    if (checkUser) {
      return res.json({ success: false, message: checkUser });
    }

    const profilepic = req.file.filename;
    const createdAt = new Date().toISOString();

    const min = 100000000;
    const max = 999999999;

    let idCard = Math.floor(Math.random() * (max - min + 1)) + min;

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
      accountType,
      profilepic,
      createdAt,
      fisheriesArea,
      divingLicenseNo,
      fisheriesRegNo,
      boatRegNo,
      idCard
    );

    if (successResFarmer) {
      res
        .status(200)
        .json({ success: true, message: "Registration Successfully" });

      let recipient = email;
      let subject = "Account Created for " + username;
      let text =
        "Hi, " +
        firstName +
        " " +
        lastName +
        "\n\n" +
        "Great news! Your Fisherman Account has been successfully created. If you have any questions or need assistance, feel free to reach out. Happy fishing! 🌊";

      emailService.sendEmail(recipient, subject, text);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Registration Unsuccessful" });
    }
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

/*--------------------------- FISHING DATA FUNCTIONS -------------------------- */

//ENTER FISHING DETAILS
exports.enterFishingDetails = async (req, res, next) => {
  try {
    const {
      userId,
      speciesType,
      numOfSpecies,
      fishingArea,
      buyer,
      buyingPrice,
      date,
    } = req.body;

    // const date = new Date().toISOString();

    if (req.file === undefined) {
      return res.json({ success: false, message: "you must select a file" });
    }

    const fishingImage = req.file.filename;

    const enteringFishingDetails = await fishermanService.enterFishingDetails(
      userId,
      speciesType,
      numOfSpecies,
      fishingArea,
      buyer,
      buyingPrice,
      date,
      fishingImage
    );
    console.log("Hi ---- ", enteringFishingDetails);

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

//DELETE FISHING DETAILS
exports.deleteFishingDetails = async (req, res, next) => {
  try {
    const { fishingId } = req.body;
    let deleteFishingDetails = await fishermanService.deleteFishingDetails(
      fishingId
    );

    if (deleteFishingDetails) {
      res.status(200).json({
        success: true,
        message: "Record deleted Successfully",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Delete Record Unsuccessfully" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GET ALL FISHING DETAILS OF A SINGLE FISHERMAN
exports.getFishingDetailsByFisherman = async (req, res, next) => {
  try {
    const { fishermanId } = req.body;

    let fishingDetails = await fishermanService.getFishermanFishingDetails(
      fishermanId
    );

    if (fishingDetails) {
      res.status(200).json({
        success: true,
        message: "Found Fishing Sea cucumber details",
        data: fishingDetails,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.log(error.message, "err---->");
    next(error);
  }
};

//GETTING SINGLE FISHING DETAIL
exports.getSingleFishingDetails = async (req, res, next) => {
  try {
    const { fishingId } = req.body;

    let singleFishingDetails = await fishermanService.getSingleFishingDetails(
      fishingId
    );

    if (singleFishingDetails) {
      res.status(200).json({
        success: true,
        message: "Found Processed Sea cucumber details",
        data: singleFishingDetails,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.log("err---->", error.message);
    next(error);
  }
};
