const loginService = require("../services/login_services");
const bcrypt = require("bcrypt");
const adminModel = require("../model/admin_model");
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

                  if (data.role == "admin") {
                    console.log(data.username);
                    tokenData = {
                      _id: data._id,
                      username: data.username,
                      firstName: data.firstName,
                    };
                  } else if (data.role == "farm") {
                    tokenData = {
                      _id: data._id,
                      name: data.name,
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

                  await adminModel.findByIdAndUpdate(data._id, {
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

    await adminModel.findByIdAndUpdate(req.userInfo._id, { tokens: newTokens });
    res.json({ success: true, message: "Sign out successfully!" });
  }
};
