var connection = require("../connection");
const Schema = connection.Schema;
const AddressSchema = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  locality: {
    type: String
  },
  landmark: {
    type: String
  },
  city: {
    type: String
  },
  pin: {
    type: Number
  },
  contact: {
    type: Number
  },
  Lat: {
    type: Number //should be in N/S order
  },
  Long: {
    type: Number //should be in E/W order
  }
});
module.exports = AddressSchema;
