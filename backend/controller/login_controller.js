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
                    // console.log(data.username);
                    tokenData = {
                      _id: data._id,
                      username: data.username,
                      role: data.role,
                      firstName: data.firstName,
                      age: data.age,
                      gender: data.gender,
                      email: data.email,
                      contactNo: data.contactNo,
                      province: data.province,
                      country: data.country,
                      address: data.address,
                      town: data.town,
                      profilepic: data.profilepic,
                    };
                  } else if (
                    data.role == "Chairman" ||
                    data.role == "Director General" ||
                    data.role == "Assistant Director" ||
                    data.role == "District Aquaculturist" ||
<<<<<<< HEAD
                    data.role == "Minister" ||
                    data.role == "District Extension Officer" ||
                    data.role == "Regional Officer"
=======
                    data.role == "Regional Officer" ||
                    data.role == "District Extension Officer" ||
                    data.role == "Minister"
>>>>>>> 149478c675caa3e8da2a3bdc8468f718550706a1
                  ) {
                    tokenData = {
                      _id: data._id,
                      username: data.username,
                      role: data.role,
                      subrole: data.subrole,
                      age: data.age,
                      gender: data.gender,
                      email: data.email,
                      nicNo: data.nicNo,
                      accountStatus: data.accountStatus,
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
                      nicNo: data.nicNo,
                      accountStatus: data.accountStatus,
                      firstName: data.firstName,
                      lastName: data.lastName,
                      contactNo: data.contactNo,
                      address: data.address,
                      town: data.town,
                      province: data.province,
                      country: data.country,
                      farmId: data.farmId,
                      farmName: data.farmName,
                      profilepic: data.profilepic,
                      createdAt: data.createdAt,
                    };
                  } else if (data.role == "Fisherman") {
                    tokenData = {
                      _id: data._id,
                      username: data.username,
                      role: data.role,
                      subrole: data.subrole,
                      age: data.age,
                      gender: data.gender,
                      email: data.email,
                      accountType: data.accountType,
                      accountStatus: data.accountStatus,
                      nicNo: data.nicNo,
                      firstName: data.firstName,
                      lastName: data.lastName,
                      contactNo: data.contactNo,
                      address: data.address,
                      town: data.town,
                      province: data.province,
                      country: data.country,
                      profilepic: data.profilepic,
                      createdAt: data.createdAt,
                      fisheriesArea: data.fisheriesArea,
                      divingLicenseNo: data.divingLicenseNo,
                      fisheriesRegNo: data.fisheriesRegNo,
                      boatRegNo: data.boatRegNo,
                      idCard: data.idCard,
                    };
                  } else if (
                    data.role == "Exporter" ||
                    data.role == "Processor"
                  ) {
                    tokenData = {
                      _id: data._id,
                      username: data.username,
                      role: data.role,
                      subrole: data.subrole,
                      age: data.age,
                      gender: data.gender,
                      email: data.email,
                      nicNo: data.nicNo,
                      accountStatus: data.accountStatus,
                      firstName: data.firstName,
                      lastName: data.lastName,
                      contactNo: data.contactNo,
                      address: data.address,
                      town: data.town,
                      province: data.province,
                      country: data.country,
                      profilepic: data.profilepic,
                      createdAt: data.createdAt,
                      companyName: data.companyName,
                      processorRegNo: data.processorRegNo,
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
                  res.status(200).json({
                    success: false,
                    message: "Invaild credentials entered",
                  });
                }
              })
              .catch((err) => {
                res.status(200).json({
                  success: false,
                  message: "An error occured while comparing passwords",
                });
              });
          } else {
            res.status(200).json({
              success: false,
              message: "Invaild credentials entered!",
            });
          }
        })
        .catch((err) => {
          res.status(200).json({
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

exports.forgotPasswordOTPSend = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (email == "") {
      res.status(404).json({ success: false, message: "Please Enter a email" });
    } else {
      let data = await loginService.checkuserByEmail(email);

      if (data == null) {
        res.status(200).json({
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
          message: "OTP Code sent to " + email,
          email,
          userId,
        });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
    next(error);
  }
};

exports.otpVerification = async (req, res, next) => {
  try {
    const { otp, userId } = req.body;

    if (otp == "") {
      res.json({ success: false, message: "Please Enter a OTP" });
    } else {
      let otpDB = await loginService.getOtp(userId);

      if (otp != otpDB) {
        res.status(200).json({
          success: false,
          message: "Incorrect OTP entered",
        });
      } else {
        var deleteOtp = loginService.deleteOtp(userId, otp);

        res.status(200).json({
          success: true,
          message: "Enter New Password to recover account",
          userId,
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
        res.status(200).json({
          success: true,
          message:
            "Successfully changed password. Please Login with your new password",
        });
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
