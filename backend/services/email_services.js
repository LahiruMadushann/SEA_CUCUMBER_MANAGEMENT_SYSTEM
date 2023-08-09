var nodemailer = require("nodemailer");

//SENDING AN CONFORMATION EMAIL
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cst19041@std.uwu.ac.lk",
    pass: "********",
  },
});

class emailService {
  //REEGISTER EXPORTER DETAILS
  static async sendEmail(recipient, subject, text) {
    try {
      var mailOptions = {
        from: "cst19041@std.uwu.ac.lk",
        to: recipient,
        subject: subject,
        text: `${text}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            "Email sent: " + info.response + "\nSend to: " + recipient
          );
        }
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = emailService;
