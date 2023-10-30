const fishermanService = require("../services/fisherman_services");
const bcrypt = require("bcrypt");
const emailService = require("../services/email_services");
const loginService = require("../services/login_services");
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
      return res.json({ status: false, message: "you must select a file" });
    }

    let checkUser = await userService.validateReg(
      username,
      email,
      contactNo,
      nicNo
    );

    console.log(checkUser);
    if (checkUser) {
      return res.json({ status: false, message: checkUser });
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
      "Inactive",
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
        .json({ status: true, message: "Registration Successfully" });

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
        .json({ status: false, message: "Registration Unsuccessful" });
    }
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};

//ENTER FISHING DETAILS
exports.enterFishingDetails = async (req, res, next) => {
  try {
    const {
      userId,
      speciesType,
      weight,
      numOfSpecies,
      location,
      gearType,
      date,
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const fishingImage = req.file.filename;

    const enteringFishingDetails = await fishermanService.enterFishingDetails(
      userId,
      speciesType,
      weight,
      numOfSpecies,
      location,
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
