/* FUNCTIONS OF THE ADMIN 

*REGISTER ADMIN ACCOUNTS
*UPDATE ADMIN DETAILS
*CHANGE ADMIN PASSWORD

*REGISTER / GET DETAILS / DELETE - AQUACULTURE MANAGEMENT USERS - MINISTER / CHAIRMAN / DG / ASSISTANT DIRECTOR / DISTRICT AQUACULTURIST
*GET / DELETE DETAILS - FARM 
*APPROVE ACCOUNT / GET DETAILS / DELETE DETAILS- FARMER
*HAVE ACCESS TO THE DASHBOARD

*/

// const adminModel = require("../model/admin_model");
const UserModel = require("../model/user_model");
const knowledgeCenterModel = require("../model/knowledgeCenter/knowledgeCenter_model");
const ArticleModel = require("../model/knowledgeCenter/articles_model");
const FarmModel = require("../model/farm/aqFarm_model");
const faqModel = require("../model/faq_model");
const userModel = require("../model/user_model");

class AdminService {
  //REGISTER ADMIN ACCOUNTS
  static async registerAdmin(
    username,
    password,
    role,
    firstName,
    lastName,
    age,
    gender,
    email,
    contactNo,
    address,
    profilepic
  ) {
    try {
      const createAdmin = new UserModel({
        username: username,
        password: password,
        role: role,
        age: age,
        gender: gender,
        email: email,
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address,
        profilepic: profilepic,
      });

      return await createAdmin.save();
    } catch (err) {
      throw err;
    }
  }

  //UPDATE ADMIN ACCOUNTS
  static async updateAdminDetails(
    userId,
    firstName,
    lastName,
    contactNo,
    address
  ) {
    const updateadminDetails = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address,
      }
    );
    return updateadminDetails;
  }

  static async getAdminDetails(userId) {
    const adminDetails = await UserModel.findById({ _id: userId });
    return adminDetails;
  }

  /* FOR AQUACULTURE MANAGEMENT LEVEL USERS */

  //Registering Aquaculture Management users
  static async registerAqFarmMangementLevelUsers(
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
  ) {
  
    try {
      const createAqManagementUsers = new UserModel({
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
        accountStatus: "Active",
        profilepic,
        createdAt,
      });
      console.log("service user",createdAt)
      
      return await createAqManagementUsers.save();
      
    } catch (err) {
      console.log("service user",err)
      throw err;
    }
  }

  //Getting Aquaculture Management users
  static async getAllAqManagementUsers() {
    const aqMngUserDetails = await UserModel.find({
      role: {
        $in: [
          "Minister",
          "Chairman",
          "Director General",
          "Assitant Director",
          "District Aquaculturist",
        ],
      },
    });
    // console.log(aqMngUserDetails);
    return aqMngUserDetails;
  }

  /* -------------- FOR FARM MANAGEMENT ------------------ */

  //Getting All Farm Details
  static async getAllAqFarms() {
    const aqFarmDetails = await FarmModel.find();
    return aqFarmDetails;
  }

  //Deleting Aquaculture Management users
  static async deleteFarmById(id) {
    const deleteFarmDetails = await FarmModel.findByIdAndDelete({
      _id: id,
    });
    return deleteFarmDetails;
  }

  /* -------------- FOR FARMER MANAGEMENT ------------------ */

  //Approve Farmer Account
  static async approveFarmerAc(userId, state) {
    const updateAccountStatus = await UserModel.findByIdAndUpdate(
      { _id: userId },

      {
        // accountStatus: "Active",
        accountStatus: state === "Active" ? "Active" : "Inactive"

      }
    );
    return updateAccountStatus;
  }

  //Getting All Farmer Details
  static async getAllFarmers() {
    const FarmerDetails = await UserModel.find({
      role: {
        $in: ["Farmer"],
      },
    });
    return FarmerDetails;
  }
  //Getting All Fishermen Details
  static async getAllFishermens() {
    const FishermensDetails = await UserModel.find({
      role: {
        $in: ["Fisherman"],
      },
    });
    return FishermensDetails;
  }

  /* -------------- FOR EXPORTER MANAGEMENT ------------------ */

  //Getting All Exporter Details
  static async getExporters() {
    const exportersDetails = await UserModel.find({
      role: {
        $in: ["Exporter"],
      },
    });
    return exportersDetails;
  }

  /* -------------- FOR FISH PROCESSOR MANAGEMENT ------------------ */

  //Getting All Fish Processors Details
  static async getFishProcessors() {
    const fishProcessorsDetails = await UserModel.find({
      role: {
        $in: ["Processor"],
      },
    });
    return fishProcessorsDetails;
  }

  /*----------------------------------------------------------------------*/
  //OPERATIONS RELATED TO KNOWLEDGE CENTER

  static async enterIndividualSeacucumberDetails(
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
  ) {
    try {
      
      const enterSpeciesDetails = new knowledgeCenterModel({
        speciesType,
        scientificName,
        description,
        habitats,
        feeding,
        reproduction,
        lifecycle,
        fishingMethods,
        seaCucumberImages,
        createdAt,
      });
      
      return await enterSpeciesDetails.save();
      
    } catch (err) {
      console.log("Type data",err)
      throw err;
    }
  }

  static async enterArticleDetails(
    category,
    heading,
    content,
    link,
    createdAt
  ) {
    try {
      const enterSpeciesDetails = new ArticleModel({
        category,
        heading,
        content,
        link,
        createdAt,
      });

      return await enterSpeciesDetails.save();
    } catch (err) {
      throw err;
    }
  }

  //delete users
  static async deleteUserAccount(userId) {
    const deleteAccount = await userModel.findByIdAndDelete(userId);

    if (deleteAccount) {
      const profilePicPath = path.join(
        __dirname,
        "..",
        "backend",
        "uploads",
        deleteAccount.profilepic
      );
      console.log(profilePicPath);

      // Check if the file exists before attempting to delete
      if (fs.existsSync(profilePicPath)) {
        fs.unlinkSync(profilePicPath);
        console.log("Profile picture deleted successfully.");
      } else {
        console.log("Profile picture file not found.");
      }
    }
    return deleteAccount;
  }

  //ENTER FAQ DETAILS
  static async enterFAQDetails(
    question,
    answer,
    link,
    category,
    visibleToAll,
    questionAskedByID,
    createdAt
  ) {
    try {
      const enterFAQDetails = new faqModel({
        question,
        answer,
        link,
        category,
        visibleToAll,
        questionAskedByID,
        createdAt,
      });

      return await enterFAQDetails.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AdminService;
