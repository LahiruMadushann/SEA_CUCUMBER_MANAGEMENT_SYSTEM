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
      return res.json({ status: false, success: "you must select a file" });
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

    res.json({ status: true, success: successResFarm });
  } catch (error) {
    next(error);
  }
};

exports.updateAdminDetails = async (req, res, next) => {
  try {
    const { userId, firstName, lastName, contactNo, address } = req.body;
    let updatedadminDetails = await adminService.updateAdminDetails(
      userId,
      firstName,
      lastName,
      contactNo,
      address
    );
    res.json({ status: true, success: updatedadminDetails });
  } catch (error) {
    console.log(error, "err---->");
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

    res.json({ status: true, success: aquaFarmMngUsers });
  } catch (error) {
    next(error);
  }
};

exports.getAqAllFarmManagementUsers = async (req, res, next) => {
  try {
    let aqMnguserDetails = await adminService.getAllAqManagementUsers();

    // console.log(aqMnguserDetails);
    res.json({ status: true, success: aqMnguserDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

/* -------------------- FARM DETAILS - ADMIN CONTROLLERS ------------------- */

exports.getAqAllFarms = async (req, res, next) => {
  try {
    let aqFarmDetails = await adminService.getAllAqFarms();
    res.json({ status: true, success: aqFarmDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.deleteAqFarm = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let deletedDetails = await adminService.deleteFarmById(userId);

    res.json({
      status: true,
      success: "Successfully Deleted Aquaculture Management User",
      message: deletedDetails,
    });
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
    res.json({ status: true, success: "Approved" });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.getAllFarmers = async (req, res, next) => {
  try {
    let farmersDetails = await adminService.getAllFarmers();
    res.json({ status: true, success: farmersDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

/* -------------------- FARMER DETAILS - ADMIN CONTROLLERS ------------------- */

exports.getAllExporters = async (req, res, next) => {
  try {
    let exporterDetails = await adminService.getAllFarmers();
    res.json({ status: true, success: farmersDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

/* -------------------- EXPORTER DETAILS - ADMIN CONTROLLERS ------------------- */

exports.getAllExporters = async (req, res, next) => {
  try {
    let exportersDetails = await adminService.getExporters();
    res.json({ status: true, success: exportersDetails });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

/* -------------------- FISH PROCESSSORS DETAILS - ADMIN CONTROLLERS ------------------- */

exports.getAllFishProcessors = async (req, res, next) => {
  try {
    let fishProcessorsDetails = await adminService.getFishProcessors();
    res.json({ status: true, success: fishProcessorsDetails });
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
      habitatsAndFeeding,
      reproductionAndLifecycle,
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
      return res.json({ status: false, success: "you must select a file" });
    }

    const seacucumberImages = req.file.filename;

    const enterSpeciesDetails =
      await adminService.enterIndividualSeacucumberDetails(
        speciesType,
        scientificName,
        description,
        habitatsAndFeeding,
        reproductionAndLifecycle,
        fishingMethods,
        seacucumberImages
      );

    res.json({ status: true, success: enterSpeciesDetails });
  } catch (error) {
    next(error);
  }
};
