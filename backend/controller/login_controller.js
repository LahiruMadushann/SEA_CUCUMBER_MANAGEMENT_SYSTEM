const loginService = require("../services/login_services");
const bcrypt = require("bcrypt");

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
              .then((result) => {
                console.log(result);
                if (result) {
                  res.status(200).json({
                    status: "SUCCESS",
                    message: "SigninSuccessful",
                    data: data,
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
