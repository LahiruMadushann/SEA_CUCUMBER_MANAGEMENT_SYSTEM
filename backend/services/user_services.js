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

  //UPDATE USER
  static async updateUserDetails(
    userId,
    firstName,
    lastName,
    age,
    gender,
    email,
    contactNo,
    address,
    town,
    province,
    country,
    updatedAt
  ) {
    const updateUserDetails = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        age: age,
        gender: gender,
        email: email,
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address,
        town: town,
        province: province,
        country: country,
        updatedAt: updatedAt,
      }
    );
    return updateUserDetails;
  }

  //UPDATE PROFILE PIC
  static async updateProfilePic(userId, profilepic) {
    const updateProPic = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        profilepic: profilepic,
      }
    );
    return updateProPic;
  }

  //GET ALL NOTIFICATIONS
  static async getAllNotifications() {
    const allNotifications = await newsModel.find();
    return allNotifications;
  }
}

module.exports = userService;
