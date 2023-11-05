const userModel = require("../model/user_model");
const newsModel = require("../model/news_model");
const contactUsModel = require("../model/contactUs_model");
const faqModel = require("../model/faq_model");
const advertiementModel = require("../model/farm/advertisement_model");
const knowledgeCenterModel = require("../model/knowledgeCenter/knowledgeCenter_model");

const loginService = require("./login_services");

const bcrypt = require("bcrypt");

//FILE SYSTEM
const fs = require("fs");
const path = require("path");

class userService {
  //DELETE USER ACCOUNT
  static async deleteUserAccount(userId) {
    const deleteAccount = await userModel.findByIdAndDelete(userId);

    if (deleteAccount) {
      const profilePicPath = path.join(
        __dirname,
        "..",
        "Images",
        "profilePics",
        deleteAccount.profilepic
      );
      console.log(profilePicPath);

      // Check if the file exists before attempting to delete
      if (fs.existsSync(profilePicPath)) {
        fs.unlinkSync(profilePicPath);
        console.log("Profile picture deleted successfully.");
      } else {
        console.log("Profile picture file not found.");
      }
    }
    return deleteAccount;
  }

  //get all users
  static async getAllUsers() {
    const allUsers = await userModel.find();
    return allUsers;
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
    nicNo,
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
        nicNo: nicNo,
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
    const userdetails = await this.getUserDetails(userId);
    console.log(userdetails);

    if (userdetails) {
      const profilePicPath = path.join(
        __dirname,
        "..",
        "Images",
        "profilePics",
        userdetails.profilepic
      );
      // Check if the file exists before attempting to delete
      if (fs.existsSync(profilePicPath)) {
        fs.unlinkSync(profilePicPath);
        console.log("Profile picture deleted successfully.");
      } else {
        console.log("Profile picture file not found.");
      }
    }

    const updateProPic = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        profilepic: profilepic,
      }
    );
    console.log(updateProPic);
    return updateProPic;
  }

  //GET PROFILE PICTURE
  static async getProfilePicture(userId) {
    const profilePic = await userModel.findOne(
      { _id: userId },
      { profilepic: 1 }
    );
    return profilePic;
  }

  /* ------------------------------GENERATE UPDATED TOKEN ON USERID --------------------------------- */
  static async getUpdatedToken(userId) {
    let token;

    const data = await userModel.findById({ _id: userId });

    if (data) {
      // Creating Token
      let tokenData;

      if (data.role == "Admin") {
        // console.log(data.username);
        tokenData = {
          _id: data._id,
          role: data.role,
          username: data.username,
          firstName: data.firstName,
          age: data.age,
          gender: data.gender,
          email: data.email,
          contactNo: data.contactNo,
          address: data.address,
        };
      } else if (
        data.role == "Chairman" ||
        data.role == "Director General" ||
        data.role == "Assistant Director" ||
        data.role == "District Aquaculturist" ||
        data.role == "Minister"
      ) {
        tokenData = {
          _id: data._id,
          username: data.username,
          role: data.role,
          subrole: data.subrole,
          age: data.age,
          gender: data.gender,
          email: data.email,
          nicNo: data.nicNo,
          accountStatus: data.accountStatus,
          firstName: data.firstName,
          lastName: data.lastName,
          contactNo: data.contactNo,
          address: data.address,
          town: data.town,
          province: data.province,
          country: data.country,
          profilepic: data.profilepic,
          createdAt: data.createdAt,
        };
      } else if (data.role == "Farmer") {
        tokenData = {
          _id: data._id,
          username: data.username,
          role: data.role,
          subrole: data.subrole,
          age: data.age,
          gender: data.gender,
          email: data.email,
          nicNo: data.nicNo,
          firstName: data.firstName,
          lastName: data.lastName,
          contactNo: data.contactNo,
          address: data.address,
          town: data.town,
          province: data.province,
          country: data.country,
          farmId: data.farmId,
          farmName: data.farmName,
          accountStatus: data.accountStatus,
          profilepic: data.profilepic,
          createdAt: data.createdAt,
        };
      } else if (data.role == "Fisherman") {
        tokenData = {
          _id: data._id,
          username: data.username,
          role: data.role,
          subrole: data.subrole,
          age: data.age,
          gender: data.gender,
          email: data.email,
          accountType: data.accountType,
          nicNo: data.nicNo,
          firstName: data.firstName,
          lastName: data.lastName,
          contactNo: data.contactNo,
          address: data.address,
          town: data.town,
          province: data.province,
          country: data.country,
          accountStatus: data.accountStatus,
          profilepic: data.profilepic,
          createdAt: data.createdAt,
          fisheriesArea: data.fisheriesArea,
          divingLicenseNo: data.divingLicenseNo,
          fisheriesRegNo: data.fisheriesRegNo,
          boatRegNo: data.boatRegNo,
          idCard: data.idCard,
        };
      } else if (data.role == "Exporter" || data.role == "Processor") {
        tokenData = {
          _id: data._id,
          username: data.username,
          role: data.role,
          subrole: data.subrole,
          age: data.age,
          gender: data.gender,
          email: data.email,
          nicNo: data.nicNo,
          accountStatus: data.accountStatus,
          firstName: data.firstName,
          lastName: data.lastName,
          contactNo: data.contactNo,
          address: data.address,
          town: data.town,
          province: data.province,
          country: data.country,
          profilepic: data.profilepic,
          createdAt: data.createdAt,
        };
      }
      console.log(tokenData);

      token = loginService.generateToken(tokenData, "secret", "1d");
      console.log(token);
    }
    return token;
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
        replyed: false,
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
    const allFaqDetails = await faqModel.find().sort({ createdAt: -1 });
    return allFaqDetails;
  }

  //GET ALL Contact Us DETAILS
  static async getContactUs() {
    const contactUs = await contactUsModel.find({ replyed: false }).sort({ createdAt: -1 });
    return contactUs;
  }
  //Update Contact Us detail
  //Approve Farmer Account
  static async updateContactUs(userId, state) {
    const updateAccountStatus = await contactUsModel.findByIdAndUpdate(
      { _id: userId },

      {
        // accountStatus: "Active",
        replyed: state === "true" ? true : false,
      }
    );
    return updateAccountStatus;
  }

  /* ------------------------------ REGISTRATION VALIDATION --------------------------------- */

  static async validateReg(username, email, contactNo, nicNo) {
    try {
      let msg;

      if (await userModel.findOne({ username })) {
        msg = "Username already exists";
      }
      // else if (await userModel.findOne({ email })) {
      //   msg = "Email already exists";
      // }
      else if (await userModel.findOne({ contactNo })) {
        msg = "Contact number already exists";
      } else {
        msg = null;
      }

      console.log(msg);

      return msg;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userService;
