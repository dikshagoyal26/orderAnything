var connection = require("../connection");
const Schema = connection.Schema;
const AddressSchema = require("./address");

var CatalogueSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  Addresses: [
    {
      type: AddressSchema,
      required: true
    }
  ]
});

const CatalogueModel = connection.model("Catalogues", CatalogueSchema);
module.exports = CatalogueModel;
