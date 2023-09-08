const adminService = require("../services/admin_services");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      age,
      gender,
      email,
      contactNo,
      address,
    } = req.body;

    if (req.file === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "you must select a file" });
    }

    const profilepic = req.file.filename;

    const successResFarm = await adminService.registerAdmin(
      username,
      password,
      "Admin",
      firstName,
      lastName,
      age,
      gender,
      email,
      contactNo,
      address,
      profilepic
    );

    if (successResFarm) {
      res
        .status(200)
        .json({ success: true, message: "Admin account successfully created" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Error during saving process" });
    }
  } catch (error) {
    next(error);
  }
};

//AQUACULTURE MANAGEMENT USERS - ADMIN CONTROLLERS

exports.registerAqFarmManagementUsers = async (req, res, next) => {
  try {
    const {
      username,
      password,
      role,
      subrole,
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
    } = req.body;

    if (req.file === undefined) {
      return res.json({ status: false, success: "you must select a file" });
    }

    const createdAt = new Date().toISOString();
    const profilepic = req.file.filename;

    const aquaFarmMngUsers =
      await adminService.registerAqFarmMangementLevelUsers(
        username,
        password,
        role,
        subrole,
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
        createdAt
      );

    if (aquaFarmMngUsers) {
      res.status(201).json({
        success: true,
        message: "User account has been created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User account creation was unsuccessful",
      });
    }
  } catch (error) {
    next(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAqAllFarmManagementUsers = async (req, res, next) => {
  try {
    let aqMnguserDetails = await adminService.getAllAqManagementUsers();

    if (aqMnguserDetails) {
      res.status(200).json({ success: true, data: aqMnguserDetails });
    } else {
      res.status(204).json({ success: false, message: "No data Found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

/* -------------------- FARM DETAILS - ADMIN CONTROLLERS ------------------- */

exports.getAqAllFarms = async (req, res, next) => {
  try {
    let aqFarmDetails = await adminService.getAllAqFarms();

    if (aqFarmDetails) {
      res.status(200).json({
        success: true,
        message: "Found farm details",
        data: aqFarmDetails,
      });
    } else {
      res.status(204).json({ success: false, message: "No farm data found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.deleteAqFarm = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deletedDetails = await adminService.deleteFarmById(userId);

    if (deletedDetails) {
      res
        .status(200)
        .json({ success: true, message: "Successfully deleted Farm" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Error occured while deletind farm" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

/* -------------------- FARMER DETAILS - ADMIN CONTROLLERS ------------------- */

exports.approveFarmerAccount = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let approveAccount = await adminService.approveFarmerAc(userId);

    if (approveAccount) {
      res.status(200).json({ success: true, message: "Approved" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Error in approving account" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.getAllFarmers = async (req, res, next) => {
  try {
    let farmersDetails = await adminService.getAllFarmers();

    if (farmersDetails) {
      res.status(200).json({
        success: true,
        message: "Found farmers details",
        data: farmersDetails,
      });
    } else {
      res.status(400).json({ success: false, message: "No farmer data found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

/* -------------------- EXPORTER DETAILS - ADMIN CONTROLLERS ------------------- */

exports.getAllExporters = async (req, res, next) => {
  try {
    let exportersDetails = await adminService.getExporters();

    if (exportersDetails) {
      res.status(200).json({
        success: true,
        message: "Found exporters details",
        data: exportersDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No exporter data found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

/* -------------------- FISH PROCESSSORS DETAILS - ADMIN CONTROLLERS ------------------- */

exports.getAllFishProcessors = async (req, res, next) => {
  try {
    let fishProcessorsDetails = await adminService.getFishProcessors();

    if (fishProcessorsDetails) {
      res.status(200).json({
        success: true,
        message: "Found Fish Processors details",
        data: fishProcessorsDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No Fish Processor data found" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//DISTRICT AQUACULTURIST DETAILS - ADMIN CONTROLLERS

//OPERATIONS RELATED TO KNOWLEDGE CENTER

exports.enterSeacucumberDetails = async (req, res, next) => {
  try {
    const {
      speciesType,
      scientificName,
      description,
      habitats,
      feeding,
      reproduction,
      lifecycle,
      fishingMethods,
    } = req.body;

    // let seacucumberImages;

    // if(req.files){
    //   let path = ""
    //   req.files.foreach(function(files, index, arr){
    //     path = path + files.path + ','
    //   })
    //   path = path.substring(0, path.lastIndexOf(","))
    //   seacucumberImages = path;

    // }

    if (req.file === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "you must select a file" });
    }

    const seaCucumberImages = req.file.filename;
    const createdAt = new Date().toISOString();

    const enterSpeciesDetails =
      await adminService.enterIndividualSeacucumberDetails(
        speciesType,
        scientificName,
        description,
        habitats,
        feeding,
        reproduction,
        lifecycle,
        fishingMethods,
        seaCucumberImages,
        createdAt
      );

    if (enterSpeciesDetails) {
      res.status(200).json({
        success: true,
        message: "Species Details entered Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during saving species details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

exports.enterArticleDetails = async (req, res, next) => {
  try {
    const { category, heading, content, link } = req.body;

    const createdAt = new Date().toISOString();

    const enterArticleDetails = await adminService.enterArticleDetails(
      category,
      heading,
      content,
      link,
      createdAt
    );

    if (enterArticleDetails) {
      res.status(200).json({
        success: true,
        message: "Article Details entered Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during saving article details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};
