const aqFarmModel = require("../model/farm/aqFarm_model");
const userModel = require("../model/user_model");
const emailService = require("./email_services");

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

  static async checkuserByEmail(email) {
    try {
      let details;

      if (await userModel.findOne({ email })) {
        details = await userModel.findOne({ email });
      } else {
        details = null;
      }

      return details;
    } catch (error) {
      throw error;
    }
  }

  //UPDATE EXPORTER ACCOUNT DETAILS
  static async updateOtpandSendEmail(
    userId,
    username,
    firstName,
    lastName,
    email
  ) {
    const min = 1000;
    const max = 9999;

    let otp = Math.floor(Math.random() * (max - min + 1)) + min;

    let recipient = email;
    let subject = "Account password reset for " + username;
    let text =
      "Hi," +
      firstName +
      " " +
      lastName +
      "\n" +
      "Your password reset opt is : " +
      otp;

    emailService.sendEmail(recipient, subject, text);

    const updateOtp = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        otp: otp,
      }
    );
    return "Successfully send OTP";
  }
}

module.exports = loginService;
