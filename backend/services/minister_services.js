const userModel = require("../model/user_model");
const newsModel = require("../model/news_model");
const bcrypt = require("bcrypt");

class ministerService {
  
  //UPDATE MINISTER ACCOUNT DETAILS
  static async updateMinisterDetails(
    userId,
    age,
    gender,
    email,
    firstName,
    lastName,
    contactNo,
    address,
    town,
    province,
    country,
    profilepic,
    updatedAt
  ) {
    const updateMinisterDetails = await userModel.findByIdAndUpdate(
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
        profilepic: profilepic,
        updatedAt: updatedAt,
      }
    );
    return updateMinisterDetails;
  }

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
