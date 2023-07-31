const loginService = require("../services/login_services");
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
                    };
                  } else if (data.role == "Chairman") {
                    tokenData = {
                      _id: data._id,
                      role: data.role,
                      username: data.username,
                      address: data.address,
                    };
                  } else if (data.role == "DG") {
                    tokenData = {
                      _id: data._id,
                      role: data.role,
                      username: data.username,
                      address: data.address,
                    };
                    a;
                  } else if (data.role == "AssistantDirector") {
                    tokenData = {
                      _id: data._id,
                      role: data.role,
                      username: data.username,
                      address: data.address,
                    };
                  } else if (data.role == "DistrictAquaculturist") {
                    tokenData = {
                      _id: data._id,
                      role: data.role,
                      username: data.username,
                      address: data.address,
                    };
                  } else if (data.role == "Farmer") {
                    tokenData = {
                      _id: data._id,
                      role: data.role,
                      username: data.username,
                      address: data.address,
                    };
                  } else if (data.role == "Exporter") {
                    tokenData = {
                      _id: data._id,
                      role: data.role,
                      username: data.username,
                      address: data.address,
                    };
                  } else if (data.role == "FishProcessor") {
                    tokenData = {
                      _id: data._id,
                      role: data.role,
                      username: data.username,
                      address: data.address,
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
                    status: "SUCCESS",
                    message: "SigninSuccessful",
                    data: data,
                    token: token,
                  });
                } else {
                  res.json({
                    status: "FAILED",
                    message: "Invaild password entered",
                  });
                }
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occured while comparing passwords",
                });
              });
          } else {
            res.json({
              status: "FAILED",
              message: "Invaild credentials entered!",
            });
          }
        })
        .catch((err) => {
          res.json({
            status: "FAILED",
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
        .status(401)
        .json({ success: false, message: "Authorization fail!" });
    }

    const tokens = req.userInfo.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await userModel.findByIdAndUpdate(req.userInfo._id, { tokens: newTokens });
    res.json({ success: true, message: "Sign out successfully!" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (email == "") {
      res.json({ status: "FAILED", message: "Please Enter a email" });
    } else {
      let data = await loginService.checkuserByEmail(email);

      if (data == "null") {
        res.json({
          status: "FAILED",
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

        res.status(400).json({
          status: "SUCCESS",
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
      res.json({ status: "FAILED", message: "Please Enter a OTP" });
    } else {
      let otpDB = await loginService.getOtp(userId);

      if (otp != otpDB) {
        res.json({
          status: "FAILED",
          message: "Incorrect OTP entered",
        });
      } else {
        var deleteOtp = loginService.deleteOtp(userId, otp);

        res.status(400).json({
          status: "SUCCESS",
          message: "Enter New Password to recover account",
        });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
    next(error);
  }
};
