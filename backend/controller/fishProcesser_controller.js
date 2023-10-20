const fishProcesserService = require("../services/fishProcesser_services");

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
    } else {
      res
        .status(400)
        .json({ success: false, message: "Registration Unsuccessful" });
    }
  } catch (error) {
    next(error);
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
