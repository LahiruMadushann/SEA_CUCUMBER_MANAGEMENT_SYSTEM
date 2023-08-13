/* FARM SECTION DASHBOARD */

const FarmModel = require("../model/farm/aqFarm_model");
const UserModel = require("../model/user_model");

class FarmDashboardService {
  //GET ALL FARM DETAILS
  static async getAllFarmDetails() {
    const allFarmDetails = await FarmModel.find();
    // console.log(allFarmDetails);
    return allFarmDetails;
  }

  //GET ALL FARMERS DETAILS
  static async getAllFarmersDetails() {
    const allFarmersDetails = await UserModel.find({ role: "Farmer" });
    return allFarmersDetails;
  }
}

module.exports = FarmDashboardService;
