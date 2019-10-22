const express = require("express");
const authRoute = express.Router();
const userCrud = require("../../db/helpers/userCrud");

//@route Post /user/register
//@desc Register users route
//@access Public
authRoute.post("/register", (request, response) => {
  var json = request.body;
  userCrud.register(json, response);
});

//@route Post /user/login
//@desc Login users route
//@access Public
authRoute.post("/login", (request, response) => {
  const json = request.body;
  userCrud.login(json, response);
});

//@route Get /admin/user/search
//@desc View All delivery boys
//@access Private
authRoute.get("/search", (request, response) => {
  userCrud.search(response);
});

module.exports = authRoute;
