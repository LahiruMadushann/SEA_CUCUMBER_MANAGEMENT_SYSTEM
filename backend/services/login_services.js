const aqFarmModel = require("../model/farm/aqFarm_model");
const adminModel = require("../model/admin_model");
const aquaFarmManagementUsersModel = require("../model/farm/aqfarm_managementLevelUsers");
// const aqFarmingDetailsModel = require("../model/farm/aqFarmingDetails_model");
const jwt = require("jsonwebtoken");

class loginService {
  static async checkuser(username) {
    try {
      let details;

      if (await aqFarmModel.findOne({ username })) {
        details = await aqFarmModel.findOne({ username });
      } else if (await adminModel.findOne({ username })) {
        details = await adminModel.findOne({ username });
      } else if (await aquaFarmManagementUsersModel.findOne({ username })) {
        details = await aquaFarmManagementUsersModel.findOne({ username });
      } else {
        details = null;
      }

      return details;
    } catch (error) {
      throw error;
    }
  }

  static async generateToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
    return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
  }

  static async saveToken(id, oldToken, token) {
    await adminModel.findByIdAndUpdate(id, {
      tokens: [...oldToken, { token: token, signAt: Date.now().toString() }],
    });
  }
}

module.exports = loginService;
