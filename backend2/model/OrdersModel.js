const { model } = require("mongoose");
const { OrdersSchema } = require("../schemas/OrderSchema.js");

const OrdersModel = model("order", OrdersSchema);

module.exports = { OrdersModel };