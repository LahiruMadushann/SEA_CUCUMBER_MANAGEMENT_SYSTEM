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
    createdAt,
    fisheriesArea,
    divingLicenseNo,
    fisheriesRegNo,
    boatRegNo,
    idCard
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
        fisheriesArea,
        divingLicenseNo,
        fisheriesRegNo,
        boatRegNo,
        idCard,
      });

      return await createFisherman.save();
    } catch (err) {
      throw err;
    }
  }

  static async enterFishingDetails(
    userId,
    speciesType,
    numOfSpecies,
    fishingArea,
    buyer,
    buyingPrice,
    date,
    fishingImage
  ) {
    console.log(userId);
    console.log(speciesType);
    console.log(numOfSpecies);
    console.log(fishingArea);
    console.log(buyer);
    console.log(buyingPrice);
    console.log(date);
    console.log(fishingImage);

    try {
      const fishingDetails = new fishingModel({
        fishermanId: userId,
        speciesType,
        numOfSpecies,
        fishingArea,
        buyer,
        buyingPrice,
        date,
        fishingImage,
      });

      console.log(fishingDetails);

      return await fishingDetails.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = fishermanService;
