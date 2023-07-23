const fishProcesserService = require("../services/fishProcesser_services");

//REGISTER FISH PROCESSER ACCOUNT CONTROLLER
exports.registerFishProcesser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, contactNo, address } =
      req.body;

    const successResFishProcesser =
      await fishProcesserService.registerFishProcesser(
        username,
        password,
        "FishProcessor",
        firstName,
        lastName,
        contactNo,
        address
      );

    res.json({ status: true, success: successResFishProcesser });
  } catch (error) {
    next(error);
  }
};

//UPDATE FISH PROCESSER ACCOUNT CONTROLLER
exports.updateFishProcesser = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, contactNo, address } = req.body;
    let updateFishProcesserrDetails =
      await fishProcesserService.updateFishProcesserDetails(
        userId,
        firstName,
        lastName,
        contactNo,
        address
      );
    res.json({ status: true, success: updateFishProcesserrDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//DELETE FISH PROCESSER ACCOUNT CONTROLLER
exports.deleteFishProcesser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deleteFishProcesserAccount =
      await fishProcesserService.deleteFishProcesserrAccount(userId);
    res.json({ status: true, success: deleteFishProcesserAccount });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};
