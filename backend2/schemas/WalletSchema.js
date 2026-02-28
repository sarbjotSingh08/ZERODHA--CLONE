const { Schema } = require("mongoose");

const WalletSchema = new Schema({
  balance: {
    type: Number,
    default: 100000,
  },
});

module.exports = { WalletSchema };