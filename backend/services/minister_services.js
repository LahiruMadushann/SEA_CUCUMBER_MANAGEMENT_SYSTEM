const userModel = require("../model/user_model");
const newsModel = require("../model/news_model");
const bcrypt = require("bcrypt");

class ministerService {
  //UPDATE MINISTER ACCOUNT DETAILS
  static async updateMinisterDetails(
    userId,
    firstName,
    lastName,
    age,
    contactNo,
    address
  ) {
    const updateMinisterDetails = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        age: age,
        address: address,
      }
    );
    return "Successfully updated Minister details";
  }

  // //GET INDIVIDUAL MINISTER DETAILS
  // static async getMinisterDetails(userId) {
  //   const ministerDetails = await userModel.findById({ _id: userId });
  //   return ministerDetails;
  // }

  //ENTER NEW RULES AND REGULATIONS
  static async enterNewsRulesRegulations(
    description,
    type,
    date,
    role,
    postedBy,
    postedTo
  ) {
    try {
      const enterNews = new newsModel({
        description,
        type,
        date,
        role,
        postedBy,
        postedTo,
      });

      return await enterNews.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ministerService;
