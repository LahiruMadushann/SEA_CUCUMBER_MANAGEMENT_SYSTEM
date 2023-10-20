const knowledgeCenterService = require("../services/knowledgeCenter_services");

const bcrypt = require("bcrypt");

//GET ALL ARTICLES DETAILS
exports.getAllArticlesData = async (req, res, next) => {
  try {
    let allArticlesData = await knowledgeCenterService.getAllArticles();

    if (allArticlesData) {
      res.status(200).json({ status: true, data: allArticlesData });
    } else {
      res.status(404).json({ status: false, message: "There are no Articles" });
    }
  } catch (error) {
    console.log(error, error.message);
    res.status(404).json({ status: false, message: error.message });
    next(error);
  }
};

//GET ALL ARTICLES CATEGORIES
exports.getAllArticlesCategories = async (req, res, next) => {
  try {
    let allArticlesCategories =
      await knowledgeCenterService.getAllArticleCategories();

    if (allArticlesCategories) {
      res.status(200).json({ status: true, data: allArticlesCategories });
    } else {
      res.status(404).json({ status: false, message: "There are no Articles" });
    }
  } catch (error) {
    console.log(error, error.message);
    res.status(404).json({ status: false, message: error.message });
    next(error);
  }
};

// //GET SINGLE SPECIES DETAILS
// exports.getSingleSpeciesDetail = async (req, res, next) => {
//   try {
//     const { speciesId } = req.body;

//     let singleSpeciesDeatails = await userService.getSingleSpeciesDetails(
//       speciesId
//     );

//     if (singleSpeciesDeatails) {
//       res.status(200).json({ status: true, data: singleSpeciesDeatails });
//     } else {
//       res.status(404).json({ status: false, message: "There are no Data" });
//     }
//   } catch (error) {
//     console.log(error, error.message);
//     next(error);
//   }
// };
