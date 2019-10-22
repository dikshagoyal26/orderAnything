var connection = require("../connection");
const Schema = connection.Schema;
var userSchema = new Schema({
  usertype: {
    type: String,
    require: true
  },
  userid: {
    type: String,
    //required: true,
    unique: true
  },
  deliveryid: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  phoneNo: {
    type: Number,
    required: true,
    unique: true
  },
  date: {
    //date of registration
    type: Date,
    default: Date.now()
  }
});

const userModel = connection.model("users", userSchema);
module.exports = userModel;
