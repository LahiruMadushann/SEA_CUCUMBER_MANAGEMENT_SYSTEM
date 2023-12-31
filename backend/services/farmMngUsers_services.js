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
    return updateFarmMngUsers;
  }

  //GET INDIVIDUAL AQUAFARMUSER DETAILS
  static async getAquaFarmUserDetails(userId) {
    const AquaFarmUserDetails = await UserModel.findById({
      _id: userId,
    });
    return AquaFarmUserDetails;
  }

  //ENTER NEW RULES AND REGULATIONS
  static async enterNewsRulesRegulations(
    title,
    description,
    type,
    date,
    role,
    postedBy,
    postedTo,
    postedById
  ) {
    try {
      const enterNews = new newsModel({
        title,
        description,
        type,
        date,
        role,
        postedBy,
        postedTo,
        postedById,
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
    postedTo,
    postedById
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
        postedById,
      });

      return await enterSeaCucumberRates.save();
    } catch (err) {
      throw err;
    }
  }

  //DELETE NEWS
  static async deleteNews(news_Id) {
    const deleteNews = await newsModel.findByIdAndDelete(news_Id);
    return deleteNews;
  }

  //REGISTER FARMS TO THE SYSTEM
  static async registerFarm(
    name,
    licenseNo,
    validity,
    location,
    extend,
    gpsCoordinatesOne,
    gpsCoordinatesTwo,
    gpsCoordinatesThree,
    gpsCoordinatesFour,
    farmInternal,
    establishmentDate,
    contactNo,
    createdAt,
    picture
  ) {
    try {
      const createFarm = new aqFarmModel({
        name,
        licenseNo,
        validity,
        location,
        extend,
        gpsCoordinatesOne,
        gpsCoordinatesTwo,
        gpsCoordinatesThree,
        gpsCoordinatesFour,
        farmInternal,
        establishmentDate,
        contactNo,
        createdAt,
        picture,
      });

      return await createFarm.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = aquaFramMngUsersService;
