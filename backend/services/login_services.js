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

      // console.log("Login service: ", details);
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
      console.log("Details: ", details);
      return details;
    } catch (error) {
      throw error;
    }
  }

  //SEND OTP TO EMAIL
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

  //CONFIRM OTP OF THE USER
  static async getOtp(userId) {
    const getOtp = await userModel.findById(userId);

    const otpDB = getOtp.otp;
    return otpDB;
  }

  //DELETE OTP OF THE USER
  static async deleteOtp(userId, otp) {
    const deleteOtp = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        $unset: {
          otp: otp,
        },
      }
    );

    return deleteOtp;
  }
}

module.exports = loginService;
