const ministerService = require("../services/minister_services");
const bcrypt = require("bcrypt");

//UPDATE MINISTER DETAILS CONTROLLER
exports.updateMinister = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, age, contactNo, address } = req.body;
    let updateMinisterDetails = await ministerService.updateMinisterDetails(
      userId,
      firstName,
      lastName,
      age,
      contactNo,
      address
    );
    res.json({ status: true, success: updateMinisterDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//DELETE MINISTER ACCOUNT CONTROLLER
exports.deleteMinister = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deleteMinisterAccount = await ministerService.deleteMinisterAccount(
      userId
    );
    res.json({ status: true, success: deleteMinisterAccount });
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
      let data = await ministerService.getMinisterDetails(userId);

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

//ENTER NEWS / RULES AND REGULATIONS
exports.enterNews = async (req, res, next) => {
  try {
    const { userId, description, type, date, postedTo } = req.body;

    let data = await ministerService.getMinisterDetails(userId);

    let postedBy = data.firstName;
    let role = data.role;

    const successResFarm = await ministerService.enterNewsRulesRegulations(
      description,
      type,
      date,
      role,
      postedBy,
      postedTo
    );

    res.json({ status: true, success: "News Posted successfully" });
  } catch (error) {
    next(error);
  }
};
