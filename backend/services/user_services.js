const userModel = require("../model/user_model");
const newsModel = require("../model/news_model");

const bcrypt = require("bcrypt");

class userService {
  //DELETE USER ACCOUNT
  static async deleteUserAccount(userId) {
    const deleteAccount = await userModel.findByIdAndDelete(userId);
    return deleteAccount;
  }

  //CHANGE USER PASSWORD
  static async changePassword(userId, newpassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(newpassword, salt);

      const changePassword = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          password: hashpass,
        }
      );

      return changePassword;
    } catch (err) {
      throw err;
    }
  }

  //GET INDIVIDUAL USER DETAILS
  static async getUserDetails(userId) {
    const userDetails = await userModel.findById({ _id: userId });
    return userDetails;
  }
}

module.exports = userService;
