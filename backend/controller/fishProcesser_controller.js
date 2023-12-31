const fishProcesserService = require("../services/fishProcesser_services");
const emailService = require("../services/email_services");
const userService = require("../services/user_services");

//REGISTER FISH PROCESSER ACCOUNT CONTROLLER
exports.registerFishProcesser = async (req, res, next) => {
  try {
    const {
      username,
      password,
      age,
      gender,
      email,
      nicNo,
      firstName,
      lastName,
      contactNo,
      address,
      town,
      province,
      country,
      companyName,
      processorRegNo,
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

    const successResFishProcesser =
      await fishProcesserService.registerFishProcesser(
        username,
        password,
        "Processor",
        age,
        gender,
        email,
        nicNo,
        firstName,
        lastName,
        contactNo,
        address,
        town,
        province,
        country,
        companyName,
        processorRegNo,
        profilepic,
        createdAt
      );

    if (successResFishProcesser) {
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
        "Great news! Your Processor Account has been successfully created. If you have any questions or need assistance, feel free to reach out. Happy fishing! 🌊";

      emailService.sendEmail(recipient, subject, text);
    } else {
      res
        .status(400)
        .json({ success: false, message: "Registration Unsuccessful" });
    }
  } catch (error) {
    next(error);
    console.log("Error: ", error.message);
  }
};

//ENTER PROCESSED SEA CUCUMBER DETAILS
exports.enterSCProcessedDetails = async (req, res, next) => {
  try {
    const {
      processorId,
      speciesType,
      weight,
      collectedFrom,
      collectedLocation,
      date,
    } = req.body;

    console.log("Files: ", req.files);

    if (req.files === undefined || req.files.length === 0) {
      return res.json({ success: false, message: "you must select a file" });
    }

    if (req.files) {
      let path = "";
      req.files.forEach(function (files, index, arr) {
        path = path + files.filename + ",";
      });
      path = path.substring(0, path.lastIndexOf(","));
      processorStockImages = path;
    }

    // const processorStockImages = req.file.filename;

    const successEnterProcessedDetails =
      await fishProcesserService.enterProcessedDetails(
        processorId,
        speciesType,
        weight,
        collectedFrom,
        collectedLocation,
        processorStockImages,
        date
      );

    if (successEnterProcessedDetails) {
      res.status(200).json({
        success: true,
        message: "Seacucumber Processed Details entered Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Seacucumber Processed Details entered was Unsuccessful",
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

//UPDATE PROCESSED STOCK
exports.updateProcessedStock = async (req, res, next) => {
  try {
    const {
      processorId,
      speciesType,
      weight,
      collectedFrom,
      collectedLocation,
    } = req.body;

    let updateStockDetails =
      await fishProcesserService.updateprocessedStockDetails(
        processorId,
        speciesType,
        weight,
        collectedFrom,
        collectedLocation
      );

    if (updateStockDetails) {
      res.status(200).json({
        success: true,
        message: "Update Successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Update Unsuccessful" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//DELETE PROCESSED DETAILS
exports.deleteStockDetails = async (req, res, next) => {
  try {
    const { recordId } = req.body;
    let deleteStockDetails =
      await fishProcesserService.deleteProcessedStockDetails(recordId);

    if (deleteStockDetails) {
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

//GETTING PROCESSED SEA CUCUMBER DETAILS FROM A INDIVIDUAL PROCESSOR
exports.getProcessedSeacucumberDetails = async (req, res, next) => {
  try {
    const { processorId } = req.body;

    let pscDetails = await fishProcesserService.getProcessedSCDetails(
      processorId
    );

    console.log(pscDetails);
    console.log(processorId);
    if (pscDetails) {
      res.status(200).json({
        success: true,
        message: "Found Processed Sea cucumber details",
        data: pscDetails,
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

//GETTING SINGLE PROCESSED SEA CUCUMBER DETAILS
exports.getSingleProcessedSeacucumberDetails = async (req, res, next) => {
  try {
    const { recordId } = req.body;

    let pscDetails = await fishProcesserService.getProcessedRecordDetails(
      recordId
    );

    if (pscDetails) {
      res.status(200).json({
        success: true,
        message: "Found Processed Sea cucumber details",
        data: pscDetails,
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
