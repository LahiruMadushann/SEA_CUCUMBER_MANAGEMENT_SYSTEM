const ministerService = require("../services/minister_services");

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
