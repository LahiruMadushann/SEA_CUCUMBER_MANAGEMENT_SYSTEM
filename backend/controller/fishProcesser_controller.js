const fishProcesserService = require("../services/fishProcesser_services");
const emailService = require("../services/email_services");

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
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
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
    console.log("Error: ",error.message)
  }
};

//ENTER PROCESSED SEA CUCUMBER DETAILS
exports.enterSCProcessedDetails = async (req, res, next) => {
  try {
    const { processorId, spiecesType, weight, receivedFrom, date } = req.body;

    const successEnterProcessedDetails =
      await fishProcesserService.enterProcessedDetails(
        processorId,
        spiecesType,
        weight,
        receivedFrom,
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
