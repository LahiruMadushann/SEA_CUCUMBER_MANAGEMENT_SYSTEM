const fishProcesserService = require("../services/fishProcesser_services");

//REGISTER FISH PROCESSER ACCOUNT CONTROLLER
exports.registerFishProcesser = async (req, res, next) => {
  try {
    const { username, password, firstName, age, lastName, contactNo, address } =
      req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const profilepic = req.file.filename;

    const successResFishProcesser =
      await fishProcesserService.registerFishProcesser(
        username,
        password,
        "FishProcessor",
        age,
        firstName,
        lastName,
        contactNo,
        address,
        profilepic
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
