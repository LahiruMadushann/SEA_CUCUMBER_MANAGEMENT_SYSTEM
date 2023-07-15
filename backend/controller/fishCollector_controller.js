const fishCollectorService = require("../services/fishCollector_services");

exports.registerFishCollector = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, contactNo, address } =
      req.body;

    const successResFishCollector =
      await fishCollectorService.registerFishCollector(
        username,
        password,
        "FishCollector",
        firstName,
        lastName,
        contactNo,
        address
      );

    res.json({ status: true, success: successResFishCollector });
  } catch (error) {
    next(error);
  }
};

exports.updateFishCollector = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, contactNo, address } = req.body;
    let updateFishCollectorDetails =
      await fishCollectorService.updateFishCollectorDetails(
        userId,
        firstName,
        lastName,
        contactNo,
        address
      );
    res.json({ status: true, success: updateFishCollectorDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//GETTING AQUA CULTURE FARM DETAILS

// exports.getAquaFarmDetails = async (req, res, next) => {
//   try {
//     let aquaFarmDetails = await exporterService.getAllAquaFarms();

//     res.json({ status: true, success: aquaFarmDetails });
//   } catch (error) {
//     console.log(error, "err---->");
//     next(error);
//   }
// };
