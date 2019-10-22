const catalogueModel = require("../models/catalogue"); //Schema
const appCodes = require("../../utils/appcodes"); //App codes

const catalogueOperations = {
  add(catalogueObject, response) {
    catalogueModel.create(catalogueObject, (err) => {
      if (err) {
        console.log("Error in Record Add", err);
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error" + err
        });
      } else {
        console.log("Record Added..");
        response.status(appCodes.OK).json({
          status: appCodes.SUCCESS,
          message: "Record Added"
        });
      }
    });
  }
};
module.exports = catalogueOperations;
