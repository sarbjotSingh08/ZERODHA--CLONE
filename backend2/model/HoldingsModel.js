const {model}=require("mongoose");
// require a model for creating a collection from mongoose library
const {HoldingsSchema}=require("../schemas/HoldingsSchema");
// destructuring perfomed 

const HoldingsModel = model("holding",HoldingsSchema);
// model is used to create / access the collection
module.exports={HoldingsModel};