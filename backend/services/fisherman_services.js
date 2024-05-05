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
        accountStatus: "Inactive",
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

  /*--------------------------- FISHING DATA FUNCTIONS -------------------------- */
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

  //DELETE FISHING DETAILS
  static async deleteFishingDetails(fishingId) {
    const deletedFishingDetails = await fishingModel.findByIdAndDelete({
      _id: fishingId,
    });
    return deletedFishingDetails;
  }

  //GET ALL FISHING DETAILS OF A SINGLE FISHERMAN
  static async getFishermanFishingDetails(fishermanId) {
    try {
      const getFishingDetails = await fishingModel
        .find({
          fishermanId: fishermanId,
        })
        .sort({ date: -1 });
      return getFishingDetails;
    } catch (error) {
      console.error("Error fetching details:", error.message);
      throw error;
    }
  }

  //GETTING SINGLE FISHING DETAIL
  static async getSingleFishingDetails(fishingId) {
    try {
      const getsingleFishingDetails = await fishingModel.find({
        _id: fishingId,
      });
      return getsingleFishingDetails;
    } catch (error) {
      console.error("Error fetching details:", error.message);
      throw error;
    }
  }
}

module.exports = fishermanService;
