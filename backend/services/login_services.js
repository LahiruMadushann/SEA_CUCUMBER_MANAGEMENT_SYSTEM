const aqFarmModel = require("../model/farm/aqFarm_model");
const userModel = require("../model/user_model");

// const aqFarmingDetailsModel = require("../model/farm/aqFarmingDetails_model");
const jwt = require("jsonwebtoken");

class loginService {
  static async checkuser(username) {
    try {
      let details;

      if (await userModel.findOne({ username })) {
        details = await userModel.findOne({ username });
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
