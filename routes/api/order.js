const express = require("express");
const orderRoute = express.Router();
const orderCrud = require("../../db/helpers/order");

//@route Post /order/add
//@desc add order to order route
//@access Private
orderRoute.post("/add", (req, res) => {
  const json = req.body;
  orderCrud.add(json, res);
});

//@route Get /admin/order/fsearch
//@desc search filtered order in order route
//@access Private
orderRoute.get("/fsearch", (req, res) => {
  const status = req.query.status;
  orderCrud.fsearch(status, res);
});
//@route Get /admin/order/searchAll
//@desc search all orders in order route
//@access Private
orderRoute.get("/searchAll", (req, res) => {
  orderCrud.searchAll(res);
});
//@route Put /order/update
//@desc Update order  route
//@access Private
orderRoute.put("/update", (req, res) => {
  const json = req.body;
  orderCrud.update(json, res);
});
module.exports = orderRoute;
