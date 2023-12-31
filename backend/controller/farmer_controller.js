const farmerService = require("../services/farmer_services");
const bcrypt = require("bcrypt");
const emailService = require("../services/email_services");
const userService = require("../services/user_services");

//REGISTER FARMER DETAILS CONTROLLER
exports.registerFarmer = async (req, res, next) => {
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
      farmName,
      farmId,
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

    const successResFarmer = await farmerService.registerFarmer(
      username,
      password,
      "Farmer",
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
      farmName,
      farmId,
      profilepic,
      createdAt
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
        "Great news! Your Farmer Account has been successfully created. If you have any questions or need assistance, feel free to reach out. Happy fishing! 🌊";

      emailService.sendEmail(recipient, subject, text);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Registration Unsuccessful" });
    }
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

    if (updateExporterDetails) {
      res.status(200).json({ success: true, message: "Update Successfully" });
    } else {
      res.status(400).json({ success: false, message: "update Unsuccessful" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING RELEVANT AQUACULTURE FARM OF THE FARMER
exports.getAquaFarmDetails = async (req, res, next) => {
  try {
    const { farmId } = req.body;
    let aquaFarmDetails = await farmerService.getIndividFarmDetails(farmId);

    if (aquaFarmDetails) {
      res.status(200).json({
        success: true,
        message: "Found Farm details",
        data: aquaFarmDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Not found Farm details" });
    }
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

    if (aquaFarmNews) {
      res.status(200).json({
        success: true,
        message: "Found Farm news",
        data: aquaFarmNews,
      });
    } else {
      res.status(400).json({ success: false, message: "Not found Farm news" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING AQUACULTURE FARM NAMES
exports.getAquaFarmNames = async (req, res, next) => {
  try {
    let aquaFarmNames = await farmerService.getAllAquaFarmNames();

    res.json({ status: true, success: aquaFarmNames });

    if (aquaFarmNames) {
      res.status(200).json({
        success: true,
        message: "Found Farm Names",
        data: aquaFarmNames,
      });
    } else {
      res.status(400).json({ success: false, message: "Not found Farm Found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
