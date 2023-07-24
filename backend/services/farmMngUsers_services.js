const UserModel = require("../model/user_model");
const newsModel = require("../model/news_model");
const aqFarmModel = require("../model/farm/aqFarm_model");

const bcrypt = require("bcrypt");

class aquaFramMngUsersService {
  static async updateFarmMngUserDetails(
    userId,
    firstName,
    lastName,
    age,
    contactNo,
    address
  ) {
    const updateFarmMngUsers = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        age: age,
        contactNo: contactNo,
        address: address,
      }
    );
    return "Successfully updated Farm Management User details";
  }

  //GET INDIVIDUAL AQUAFARMUSER DETAILS
  static async getAquaFarmUserDetails(userId) {
    const AquaFarmUserDetails = await UserModel.findById({ _id: userId });
    return AquaFarmUserDetails;
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

  //ENTER SEACUCUMBER RATES
  static async enterSeaCucumberRates(
    title,
    description,
    type,
    speciesType,
    rates,
    date,
    role,
    postedBy,
    postedTo
  ) {
    try {
      const enterSeaCucumberRates = new newsModel({
        title,
        description,
        type,
        speciesType,
        rates,
        date,
        role,
        postedBy,
        postedTo,
      });

      return await enterSeaCucumberRates.save();
    } catch (err) {
      throw err;
    }
  }

  //REGISTER FARMS TO THE SYSTEM
  static async registerFarm(
    name,
    address,
    age,
    role,
    licenseNo,
    validity,
    location,
    extend,
    gpsCoordinates,
    farmInternal,
    establishmentDate
  ) {
    try {
      const createFarm = new aqFarmModel({
        name,
        address,
        age,
        role,
        licenseNo,
        validity,
        location,
        extend,
        gpsCoordinates,
        farmInternal,
        establishmentDate,
      });

      return await createFarm.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = aquaFramMngUsersService;
