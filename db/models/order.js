var connection = require("../connection");
const Schema = connection.Schema;
const AddressSchema = require("./address");

var OrderSchema = new Schema({
  orderid: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now()
  },
  modeofpayment: {
    type: String
  },
  address: {
    type: AddressSchema
  },
  name: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  deliveryid: {
    type: String
  },
  items: [
    {
      itemName: {
        type: String
      },
      category: {
        type: String
      },
      address: {
        type: AddressSchema
      },
      qty: {
        type: Number
      },
      price: {
        type: Number
      }
    }
  ]
});

const OrderModel = connection.model("orders", OrderSchema);
module.exports = OrderModel;
