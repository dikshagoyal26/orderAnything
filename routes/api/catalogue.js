const express = require("express");
const authRoute = express.Router();
const catalogueCrud = require("../../db/helpers/catalogueCrud");

//@route Post /catalogue/register
//@desc Register catalogues route
//@access Private
authRoute.post("/add", (request, response) => {
  var json = request.body;
  catalogueCrud.add(json, response);
});

module.exports = authRoute;
