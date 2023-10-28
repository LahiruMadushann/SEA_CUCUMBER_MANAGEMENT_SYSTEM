const userModel = require("../model/user_model");
const newsModel = require("../model/news_model");
const contactUsModel = require("../model/contactUs_model");
const faqModel = require("../model/faq_model");
const advertiementModel = require("../model/farm/advertisement_model");
const knowledgeCenterModel = require("../model/knowledgeCenter/knowledgeCenter_model");

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

  /* ------------------------------ NOTIFICATION REALTED CODE --------------------------------- */

  //GET ALL NOTIFICATIONS
  static async getAllNotifications() {
    const allNotifications = await newsModel
      .find()
      .sort({ date: -1 })
      .limit(10);
    return allNotifications;
  }

  // GET NOTIFICATIONS POSTED TO FARMERS
  static async getNotificationsToFarmers() {
    const notifications = await newsModel
      .find({ postedTo: { $in: ["Farmer", "All"] } })
      .sort({ date: -1 })
      .limit(10);
    return notifications;
  }

  // GET NOTIFICATIONS POSTED TO EXPORTERS
  static async getNotificationsToExporters() {
    const notifications = await newsModel
      .find({ postedTo: { $in: ["Exporter", "All"] } })
      .sort({ date: -1 })
      .limit(10);
    return notifications;
  }

  // GET NOTIFICATIONS POSTED TO FISHERMENS
  static async getNotificationsToFishermens() {
    const notifications = await newsModel
      .find({ postedTo: { $in: ["Fishermen", "All"] } })
      .sort({ date: -1 })
      .limit(10);
    return notifications;
  }

  // GET NOTIFICATIONS POSTED TO PROCESSORS
  static async getNotificationsToProcessors() {
    const notifications = await newsModel
      .find({ postedTo: { $in: ["Processor", "All"] } })
      .sort({ date: -1 })
      .limit(10);
    return notifications;
  }

  // GET NOTIFICATIONS POSTED TO DISTRICT AQUACULTURIST
  static async getNotificationsToDistrictAquaculturist() {
    const notifications = await newsModel
      .find({ postedTo: { $in: ["District Aquaculturist", "All"] } })
      .sort({ date: -1 })
      .limit(10);
    return notifications;
  }

  //GET SINGLE NOTIFICATION
  static async getSingleNotification(notificationId) {
    const singleNotification = await newsModel.find({ _id: notificationId });
    return singleNotification;
  }

  /* ------------------------------ ADVERTISEMENTS REALTED CODE --------------------------------- */

  //GET ALL ADVERTISEMENTS
  static async getAllAdvertisements() {
    const allAdvertisements = await advertiementModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10);
    return allAdvertisements;
  }

  //GET SINGLE ADVERTISEMENT
  static async getSingleAdvertisement(advertisementId) {
    const singleAdvertisement = await advertiementModel.find({
      _id: advertisementId,
    });
    return singleAdvertisement;
  }

  //ENTER CONTACT US INFORMATION
  static async enterContactUsInfo(
    name,
    email,
    contactNo,
    comment,
    commentDate
  ) {
    try {
      const enterContactUsInfo = new contactUsModel({
        name,
        email,
        contactNo,
        comment,
        commentDate,
      });

      return await enterContactUsInfo.save();
    } catch (err) {
      throw err;
    }
  }

  //GET ALL SEA CUCUMBER SPECIES DATA
  static async getAllSeacucumberSpeciesData() {
    const allSeacucumberSpeciesData = await knowledgeCenterModel.find();
    return allSeacucumberSpeciesData;
  }

  //GET SINGLE SEA CUCUMBER DETAILS
  static async getSingleSpeciesDetails(speciesId) {
    const singleSpeciesDeatials = await knowledgeCenterModel.find({
      _id: speciesId,
    });
    return singleSpeciesDeatials;
  }

  //GET ALL FAQ DETAILS
  static async getAllFaqDetails() {
    const allFaqDetails = await faqModel.find();
    return allFaqDetails;
  }
}

module.exports = userService;
