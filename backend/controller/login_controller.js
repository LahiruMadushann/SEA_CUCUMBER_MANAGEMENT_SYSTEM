const loginService = require("../services/login_services");
const userService = require("../services/user_services");
const bcrypt = require("bcrypt");
const userModel = require("../model/user_model");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    let msg;
    let { username, password } = req.body;

    username = username.trim();
    password = password.trim();

    if (username == "" || password == "") {
      res.json({ status: "FAILED", message: "Empty credentials supplied" });
    } else {
      loginService
        .checkuser(username)
        .then((data) => {
          console.log(data);
          if (data) {
            //User exists
            let hashPassword = data.password;
            bcrypt
              .compare(password, hashPassword)
              .then(async (result) => {
                // console.log(result);
                if (result) {
                  // Creating Token
                  let tokenData;

                  if (data.role == "Admin") {
                    console.log(data.username);
                    tokenData = {
                      _id: data._id,
                      role: data.role,
                      username: data.username,
                      firstName: data.firstName,
                      age: data.age,
                      gender: data.gender,
                      email: data.email,
                      contactNo: data.contactNo,
                      address: data.address,
                    };
                  } else if (
                    data.role == "Chairman" ||
                    data.role == "DG" ||
                    data.role == "AssistantDirector" ||
                    data.role == "DistrictAquaculturist"
                  ) {
                    tokenData = {
                      _id: data._id,
                      username: data.username,
                      role: data.role,
                      subrole: data.subrole,
                      age: data.age,
                      gender: data.gender,
                      email: data.email,
                      firstName: data.firstName,
                      lastName: data.lastName,
                      contactNo: data.contactNo,
                      address: data.address,
                      town: data.town,
                      province: data.province,
                      country: data.country,
                      profilepic: data.profilepic,
                      createdAt: data.createdAt,
                    };
                  } else if (data.role == "Farmer") {
                    tokenData = {
                      _id: data._id,
                      username: data.username,
                      role: data.role,
                      subrole: data.subrole,
                      age: data.age,
                      gender: data.gender,
                      email: data.email,
                      firstName: data.firstName,
                      lastName: data.lastName,
                      contactNo: data.contactNo,
                      address: data.address,
                      town: data.town,
                      province: data.province,
                      country: data.country,
                      farmId: data.farmId,
                      farmName: data.farmName,
                      accountStatus: data.accountStatus,
                      profilepic: data.profilepic,
                      createdAt: data.createdAt,
                    };
                  } else if (
                    data.role == "Exporter" ||
                    data.role == "FishProcessor"
                  ) {
                    tokenData = {
                      _id: data._id,
                      username: data.username,
                      role: data.role,
                      subrole: data.subrole,
                      age: data.age,
                      gender: data.gender,
                      email: data.email,
                      firstName: data.firstName,
                      lastName: data.lastName,
                      contactNo: data.contactNo,
                      address: data.address,
                      town: data.town,
                      province: data.province,
                      country: data.country,
                      profilepic: data.profilepic,
                      createdAt: data.createdAt,
                    };
                  }

                  const token = await loginService.generateToken(
                    tokenData,
                    "secret",
                    "1d"
                  );

                  //COPIED CODE
                  let oldTokens = data.tokens || [];

                  if (oldTokens.length) {
                    oldTokens = oldTokens.filter((t) => {
                      const timeDiff =
                        (Date.now() - parseInt(t.signedAt)) / 1000;
                      if (timeDiff < 86400) {
                        return t;
                      }
                    });
                  }

                  await userModel.findByIdAndUpdate(data._id, {
                    tokens: [
                      ...oldTokens,
                      { token, signedAt: Date.now().toString() },
                    ],
                  });

                  //await loginService.saveToken(data._id, oldTokens, token);

                  await res.status(200).json({
                    success: true,
                    message: "SigninSuccessful",
                    data: data,
                    token: token,
                  });
                } else {
                  res.status(404).json({
                    success: false,
                    message: "Invaild password entered",
                  });
                }
              })
              .catch((err) => {
                res.status(404).json({
                  success: false,
                  message: "An error occured while comparing passwords",
                });
              });
          } else {
            res.status(404).json({
              success: false,
              message: "Invaild credentials entered!",
            });
          }
        })
        .catch((err) => {
          res.status(404).json({
            success: false,
            message: "An error occured while checking for existing user",
          });
        });
    }
  } catch (error) {
    next(error);
  }
};

exports.signout = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Authorization fail!" });
    }

    const tokens = req.userInfo.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await userModel.findByIdAndUpdate(req.userInfo._id, { tokens: newTokens });
    res.status(200).json({ success: true, message: "Sign out successfully!" });
  }
};

exports.forgotPasswordOTPSend = async (req, res) => {
  try {
    const { email } = req.body;

    if (email == "") {
      res.status(404).json({ success: false, message: "Please Enter a email" });
    } else {
      let data = await loginService.checkuserByEmail(email);

      if (data == "null") {
        res.status(400).json({
          success: false,
          message: "Email not registered in any account",
        });
      } else {
        let userId = data.id;
        let userName = data.username;
        let firstName = data.firstName;
        let lastName = data.lastName;

        var sendEmail = loginService.updateOtpandSendEmail(
          userId,
          userName,
          firstName,
          lastName,
          email
        );

        res.status(200).json({
          success: true,
          message: "Reset Code sent to " + email,
          data: email,
          userId,
        });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
    next(error);
  }
};

exports.otpVerification = async (req, res) => {
  try {
    const { otp, userId } = req.body;

    if (otp == "") {
      res.json({ success: false, message: "Please Enter a OTP" });
    } else {
      let otpDB = await loginService.getOtp(userId);

      if (otp != otpDB) {
        res.status(400).json({
          success: false,
          message: "Incorrect OTP entered",
        });
      } else {
        var deleteOtp = loginService.deleteOtp(userId, otp);

        res.status(400).json({
          success: true,
          message: "Enter New Password to recover account",
        });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
    next(error);
  }
};

exports.forgotPasswordChange = async (req, res) => {
  try {
    const { userId, newPassword, confirmPassword } = req.body;

    if (newPassword == "" || confirmPassword == "") {
      res.status(400).json({ success: false, message: "Please Enter a value" });
    } else if (newPassword != confirmPassword) {
      res
        .status(400)
        .json({ success: false, message: "New Password doesn't match" });
    } else {
      let passwordChanged = await userService.changePassword(
        userId,
        newPassword
      );

      if (passwordChanged) {
        res
          .status(200)
          .json({ success: true, message: "Successfully changed password" });
      } else {
        res.status(400).json({
          success: false,
          success: "Error occured while changing password",
        });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
    next(error);
  }
};
