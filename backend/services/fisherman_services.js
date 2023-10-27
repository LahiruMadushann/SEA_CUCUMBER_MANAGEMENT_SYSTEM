const userModel = require("../model/user_model");
const fishingModel = require("../model/fisheries/fishing_model");
const newsModel = require("../model/news_model");
const emailService = require("./email_services");

const bcrypt = require("bcrypt");

class fishermanService {
  //REEGISTER FISHERMAN DETAILS
  static async registerFisherman(
    username,
    password,
    role,
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
    accountStatus,
    accountType,
    profilepic,
    createdAt
  ) {
    try {
      const createFisherman = new userModel({
        username,
        password,
        role,
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
        accountStatus,
        accountType,
        profilepic,
        createdAt,
      });

      return await createFisherman.save();
    } catch (err) {
      throw err;
    }
  }

  static async enterFishingDetails(
    userId,
    speciesType,
    weight,
    numOfSpecies,
    location,
    gearType,
    date,
    fishingImage
  ) {
    try {
      const fishingDetails = new fishingModel({
        fishermanId: userId,
        speciesType,
        weight,
        numOfSpecies,
        location,
        gearType,
        date,
        fishingImage,
      });

      return await fishingDetails.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = fishermanService;
