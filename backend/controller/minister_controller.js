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
    if (updateMinisterDetails) {
      res.status(200).json({ success: true, message: "Updated Successfully" });
    } else {
      res.status(400).json({ success: false, message: "Update Unsuccessful" });
    }
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

    if (data) {
      let postedBy = data.firstName;
      let role = data.role;

      const enterNews = await ministerService.enterNewsRulesRegulations(
        description,
        type,
        date,
        role,
        postedBy,
        postedTo
      );

      if (enterNews) {
        res
          .status(200)
          .json({ success: true, message: "News entered successfully" });
      } else {
        res
          .status(400)
          .json({ success: false, message: "News entered Unsuccessfully" });
      }
    } else {
      res.status(400).json({ success: false, message: "Auuthor not found" });
    }

    res.json({ status: true, success: "News Posted successfully" });
  } catch (error) {
    next(error);
  }
};
