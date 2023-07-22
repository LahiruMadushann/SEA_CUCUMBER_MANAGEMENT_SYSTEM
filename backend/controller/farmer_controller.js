const farmerService = require("../services/exporter_services");

//REGISTER EXPORTER DETAILS CONTROLLER
exports.registerFarmer = async (req, res, next) => {
  try {
    const {  username,
      password,
      subRole,
      firstName,
      lastName,
      age,
      gender,
      contactNo,
      address,
      farmName,
      farmId,
      accountStatus } =
      req.body;

    const successResExporter = await exporterService.registerFarmer(
      username,
      password,
      "Farmer",
      subRole,
      firstName,
      lastName,
      age,
      gender,
      contactNo,
      address,
      farmName,
      farmId,
      accountStatus
    );

    res.json({ status: true, success: successResExporter });
  } catch (error) {
    next(error);
  }
};

//UPDATE EXPORTER DETAILS CONTROLLER
// exports.updateExporter = async (req, res, next) => {
//   try {
//     const { userId, firstName, lastName, contactNo, address } = req.body;
//     let updateExporterDetails = await exporterService.updateExporterDetails(
//       userId,
//       firstName,
//       lastName,
//       contactNo,
//       address
//     );
//     res.json({ status: true, success: updateExporterDetails });
//   } catch (error) {
//     console.log(error, "err---->");
//     next(error);
//   }
// };

// //DELETE EXPORTER ACCOUNT CONTROLLER
// exports.deleteExporter = async (req, res, next) => {
//   try {
//     const { userId } = req.body;
//     let deleteExporterAccount = await exporterService.deleteExporterAccount(
//       userId
//     );
//     res.json({ status: true, success: deleteExporterAccount });
//   } catch (error) {
//     console.log(error, "err---->");
//     next(error);
//   }
// };

// //GETTING AQUA CULTURE FARM DETAILS

// exports.getAquaFarmDetails = async (req, res, next) => {
//   try {
//     let aquaFarmDetails = await exporterService.getAllAquaFarms();

//     res.json({ status: true, success: aquaFarmDetails });
//   } catch (error) {
//     console.log(error, "err---->");
//     next(error);
//   }
// };
