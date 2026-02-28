const { model } = require("mongoose");
const { WalletSchema } = require("../schemas/WalletSchema");

const WalletModel = model("wallet", WalletSchema);

module.exports = { WalletModel };