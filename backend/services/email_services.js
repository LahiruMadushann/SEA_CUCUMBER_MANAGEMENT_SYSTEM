var nodemailer = require("nodemailer");

//SENDING AN CONFORMATION EMAIL
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cst19041@std.uwu.ac.lk",
    pass: "Jmp2251271",
  },
});

class exporterService {
  //REEGISTER EXPORTER DETAILS
  static async sendAccountConfirmationEmail(recipient, subject, text) {
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
          console.log("Email sent: " + info.response);
        }
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = exporterService;
