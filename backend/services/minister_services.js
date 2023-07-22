const userModel = require("../model/user_model");
const bcrypt = require("bcrypt");

class ministerService {
  //UPDATE MINISTER ACCOUNT DETAILS
  static async updateMinisterDetails(
    userId,
    firstName,
    lastName,
    age,
    contactNo,
    address
  ) {
    const updateExporterDetails = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        age: age,
        address: address,
      }
    );
    return "Successfully updated Minister details";
  }

  //DELETE MINISTER ACCOUNT
  static async deleteMinisterAccount(userId) {
    const deleteExporter = await userModel.findByIdAndDelete(userId);
    return "Successfully deleted Minister Account";
  }

  //CHANGE MINISTER PASSWORD
  static async changePassword(userId, newpassword) {
    let msg;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(newpassword, salt);

      const changePassword = await userModel.findByIdAndUpdate(
        { _id: userId },
        {
          password: hashpass,
        }
      );

      if (changePassword) {
        msg = "Successfully updated Password";
      } else {
        msg = "Error when updating Password";
      }

      return msg;
    } catch (err) {
      throw err;
    }
  }

  static async getMinisterDetails(userId) {
    const ministerDetails = await userModel.findById({ _id: userId });
    return ministerDetails;
  }
}

module.exports = ministerService;
