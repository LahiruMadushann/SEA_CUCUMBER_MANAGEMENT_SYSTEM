const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

let secretKey = "secret";

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, "secret");
      const user = await User.findById(decode._id);
      if (!user) {
        return res.json({
          success: false,
          message: "1 - unauthorized access!",
        });
      }
      req.userInfo = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.json({
          success: false,
          message: "2 - unauthorized access!",
        });
      }
      if (error.name === "TokenExpiredError") {
        return res.json({
          success: false,
          message: "sesson expired try sign in!",
        });
      }
      res.json({ success: false, message: "Internal server error!" });
    }
  } else {
    res.json({ success: false, message: "3 - unauthorized access!" });
  }
};
