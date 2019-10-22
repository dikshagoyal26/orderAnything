const UserModel = require("../models/user"); //Schema
const appCodes = require("../../utils/appcodes"); //App codes
const tokenOperations = require("../../utils/token"); //Jwt token
const encryptOperations = require("../../utils/encrypt"); //password encryption

const userOperations = {
  register(userObject, response) {
    userObject.password = encryptOperations.encryptPassword(
      userObject.password
    );
    if (userObject.usertype === "deliveryperson") {
      const uuid = require("uuid");
      userObject.deliveryid = uuid("deliveryperson", userObject.phoneNo);
      console.log(userObject);
    }
    UserModel.create(userObject, (err) => {
      if (err) {
        console.log("Error in Record Add", err);
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error" + err
        });
      } else {
        console.log("Record Added..");
        token = tokenOperations.generateToken({
          phone: userObject.phone
        });
        response.status(appCodes.OK).json({
          status: appCodes.SUCCESS,
          message: "Record Added",
          phone: userObject.phone,
          token: token
        });
      }
    });
  },
  login(userObject, response) {
    UserModel.findOne({ phone: userObject.phone }, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          if (
            encryptOperations.compareHash(userObject.password, doc.password)
          ) {
            token = tokenOperations.generateToken({
              phone: userObject.phone
            });
            response.status(appCodes.OK).json({
              status: appCodes.SUCCESS,
              message: "Welcome " + doc.name,
              token: token
            });
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid Userid or Password "
            });
          }
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid Userid or Password "
          });
        }
      }
    });
  },
  search(response) {
    UserModel.findOne({ usertype: "deliveryperson" }, (err, doc) => {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            record: doc
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Error "
          });
        }
      }
    });
  }
};
module.exports = userOperations;
