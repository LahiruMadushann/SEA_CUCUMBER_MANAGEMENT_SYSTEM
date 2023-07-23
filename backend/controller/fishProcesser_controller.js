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

//CHANGEPASSWORD
exports.changePassword = async (req, res, next) => {
  try {
    const { userId, oldpassword, newPassword, confirmPassword } = req.body;

    if (oldpassword == "" || newPassword == "" || confirmPassword == "") {
      res.json({ status: "FAILED", message: "Please Enter a value" });
    } else if (newPassword != confirmPassword) {
      res.json({ status: "FAILED", message: "New Password doesn't match" });
    } else {
      let data = await fishProcesserService.getFishProcesserDetails(userId);

      let oldPasswordDB = data.password;

      bcrypt.compare(oldpassword, oldPasswordDB, function (err, result) {
        if (result) {
          ministerService
            .changePassword(userId, newPassword)
            .then((result) => {
              res.json({ status: true, success: result });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          res.json({ status: true, success: "Error when comparing passwords" });
        }
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
    next(error);
  }
};
