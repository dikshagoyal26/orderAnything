const orderModel = require("../models/order");
const appCodes = require("../../utils/appcodes");
const shortid = require("shortid");
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);
const orderOperations = {
  add(orderObject, response) {
    orderObject.orderid = shortid.generate();

    const catalogueModel = require("../models/catalogue");
    for (let i = 0; i < orderObject.items.length; i++) {
      catalogueModel.findOne(
        { category: orderObject.items[i].category },
        (err, doc) => {
          if (err) {
            response.status(appCodes.SERVER_ERROR).json({
              status: appCodes.ERROR,
              message: "Error in DB During Find Operation"
            });
          } else {
            orderObject.items[i].address = doc.Addresses[0];
            if (i == orderObject.items.length - 1) {
              orderModel.create(orderObject, (err) => {
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
                    message: "Record Added",
                    orderid: orderObject.orderid
                  });
                }
              });
            }
          }
        }
      );
    }
  },
  update(orderObject, response) {
    orderModel.findOneAndUpdate(
      { orderid: orderObject.orderid },
      { $set: orderObject },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in Record Update", err);
          response.status(appCodes.SERVER_ERROR).json({
            status: appCodes.ERROR,
            message: "Record not updated Due to Error"
          });
        } else {
          if (doc) {
            console.log("Record updated ");

            response.status(appCodes.OK).json({
              status: appCodes.SUCCESS,
              message: "updated succesfully"
            });
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid Details "
            });
          }
        }
      }
    );
  },
  //search for orders for any user
  fsearch(status, response) {
    orderModel.find({ status: status }).exec(function(err, data) {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (data) {
          console.log("data", data);
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            message: "Orders ",
            record: data
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid details  "
          });
        }
      }
    });
  },
  searchAll(response) {
    orderModel.find({}).exec(function(err, data) {
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (data) {
          console.log("data", data);
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            message: "Orders ",
            record: data
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid details  "
          });
        }
      }
    });
  }
};
module.exports = orderOperations;
