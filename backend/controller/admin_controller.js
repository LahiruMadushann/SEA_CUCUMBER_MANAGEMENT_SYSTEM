const userModel = require("../model/user_model");
const adminService = require("../services/admin_services");
const bcrypt = require("bcrypt");
const emailService = require("../services/email_services");
const userService = require("../services/user_services");
const newsModel = require("../model/news_model");

//const news = require("../model/newsNew");

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
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      town,
      country,
      province,
      address,
      contactNo,
      role,
    } = req.body;

    if (req.file === undefined) {
      return res.json({ success: false, message: "you must select a file" });
    }

    let checkUser = await userService.validateReg(username, email, contactNo);
    console.log("Database User", username);
    console.log(checkUser);
    if (checkUser) {
      return res.json({ success: false, message: checkUser });
    }

    const createdAt = new Date().toISOString();
    const profilepic = req.file.filename;
    console.log("Database User", profilepic);
    const aquaFarmMngUsers =
      await adminService.registerAqFarmMangementLevelUsers(
        username,
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
        town,
        country,
        province,
        address,
        contactNo,
        role,
        profilepic,
        createdAt
      );

    if (aquaFarmMngUsers) {
      console.log("Database User New", profilepic);
      res.status(201).json({
        success: true,
        message: "User account has been created successfully",
      });
      let recipient = email;
      let subject = "Account Created for " + username;
      let text =
        "Hi, " +
        firstName +
        " " +
        lastName +
        "\n\n" +
        "Great news! Your " +
        role +
        " Account has been successfully created. If you have any questions or need assistance, feel free to reach out. Happy fishing! 🌊";

      emailService.sendEmail(recipient, subject, text);
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
    const { id, state } = req.params;
    // const { userId } = req.body;
    let approveAccount = await adminService.approveFarmerAc(id, state);

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

exports.getAllFishermens = async (req, res, next) => {
  try {
    let fishermensDetails = await adminService.getAllFishermens();

    if (fishermensDetails) {
      res.status(200).json({
        success: true,
        message: "Found Fishermens details",
        data: fishermensDetails,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "No fishermens data found" });
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

//Get User detail
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Userge new id ",await userModel.findById(id))
    // // const user = await User.findById(id);
    res.json(await userModel.findById(id));
    // res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*--------------------------------- OPERATIONS RELATED TO KNOWLEDGE CENTER------------------------------------------------*/

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

//UPDATE SEACUCUMBER DETAILS
exports.updateSeacucumberDetails = async (req, res, next) => {
  try {
    const {
      speciesId,
      speciesType,
      scientificName,
      description,
      habitats,
      feeding,
      reproduction,
      lifecycle,
      fishingMethods,
    } = req.body;

    const updatedSpeciesDetails = await adminService.updateSeacucumberDetails(
      speciesId,
      speciesType,
      scientificName,
      description,
      habitats,
      feeding,
      reproduction,
      lifecycle,
      fishingMethods
    );

    if (updatedSpeciesDetails) {
      res.status(200).json({
        success: true,
        message: "Species Details updated Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during updating species details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

//DELETE SEACUCUMBER DETAILS
exports.deleteSeaCucumberDetails = async (req, res, next) => {
  try {
    const { speciesId } = req.body;

    const deleteSCDetails = await adminService.deleteSeacucumberDetails(
      speciesId
    );

    if (deleteSCDetails) {
      res.status(200).json({
        success: true,
        message: "Species Details deleted Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during deleting Species details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

//ENTER ARTICLE DETAILS
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

//UPDATE ARTICLE DETAILS
exports.updateArticleDetails = async (req, res, next) => {
  try {
    const { articleId, category, heading, content, link } = req.body;

    const updatedArticleDetails = await adminService.updateArticleDetails(
      articleId,
      category,
      heading,
      content,
      link
    );

    if (updatedArticleDetails) {
      res.status(200).json({
        success: true,
        message: "Article Details updated Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during updating Article details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

//DELETE ARTICLE DETAILS
exports.deleteArticleDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
 
  
    const deletedArticelDetails = await adminService.deleteArticleDetails(
      id
      
    );
    console.log("User Id",id)
    if (deletedArticelDetails) {
      res.status(200).json({
        success: true,
        message: "Article Details deleted Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during deleting Article details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params; // Use id to get the userId
    let deleteUserAccount = await adminService.deleteUserAccount(id);

    if (deleteUserAccount) {
      res.status(200).json({
        success: true,
        message: "Your account was deleted Successfully",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Delete Account Unsuccessfully" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params; // Use id to get the userId
    let updateUserAccount = await adminService.deleteUserAccount(id);

    if (updateUserAccount) {
      res.status(200).json({
        success: true,
        message: "Your account was updated Successfully",
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Update Account Unsuccessfully" });
    }
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

//enter news
exports.addNews = async (req, res) => {
  try {
    console.log("Received message data:", req.body);
    const {
      userId,
      role,
      message,
      title,
      description,
      type,
      postedBy,
      postedTo,
    } = req.body;
    console.log("Received role:", role); // Log the role

    const newMessage = new newsModel({
      userId,
      role,
      message,
      title,
      description,
      type,
      postedBy,
      postedTo,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(400).json({ message: error.message });
  }
};

/*--------------------------- FAQ FUNCTIONS -----------------------------*/

//ENTER FAQ DETAILS
exports.enterFAQDetails = async (req, res, next) => {
  try {
    const {
      question,
      answer,
      link,
      category,
      visibleToAll,
      questionAskedByID,
    } = req.body;

    const createdAt = new Date().toISOString();

    const enterFAQDetails = await adminService.enterFAQDetails(
      question,
      answer,
      link,
      category,
      visibleToAll,
      questionAskedByID,
      createdAt
    );

    if (enterFAQDetails) {
      res.status(200).json({
        success: true,
        message: "FAQ Details entered Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during saving FAQ details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

//DELETE FAQ DETAILS
exports.deleteFAQDetails = async (req, res, next) => {
  try {
    const { faqId } = req.body;

    const deleteFAQDetails = await adminService.deleteFAQDetails(faqId);

    if (deleteFAQDetails) {
      res.status(200).json({
        success: true,
        message: "FAQ Details deleted Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during deleting FAQ details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

//Update FQAs
exports.updateFAQs = async (req, res, next) => {
  try {
    const { faqId, question, answer, category, visibleToAll } = req.body;

    const updatedFAQ = await adminService.updateFAQs(
      faqId,
      question,
      answer,
      category,
      visibleToAll
    );

    if (updatedFAQ) {
      res.status(200).json({
        success: true,
        message: "FAQ Details deleted Sucessfully",
      });
    } else {
      res.status(400).json({
        success: false,
        success: "Error during deleting FAQ details",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};

/* -------------------------------------- REPLY FOR CONTACT US COMMENTS ---------------------------------------------- */
//REPLY TO CONTACT US COMMENTS

exports.replyComment = async (req, res, next) => {
  try {
    const { commentId, name, comment, email, reply } = req.body;

    const updateCommentReply = await adminService.replyComment(
      commentId,
      reply
    );

    if (updateCommentReply) {
      res.status(200).json({
        success: true,
        message: "Reply for the comment send successfully",
      });
      let recipient = email;
      let subject = "Reply for yor comment on the Seacucumber Manager App";
      let text = "Hi, " + name+
      "\n\n" + reply + "\n\n" + "Your comment: " + comment;

      emailService.sendEmail(recipient, subject, text);
    } else {
      res.status(400).json({
        success: false,
        success: "Error during sending reply for the comment",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
};
