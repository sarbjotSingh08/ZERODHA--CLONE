const {Schema}=require("mongoose");

const HoldingsSchema=new Schema({
  name:String,
  qty:Number,
  avg:Number,
  price:Number,
  net:String,
  day:String
});

module.exports={HoldingsSchema};
// holdings
// export const holdings = [
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },]

// take a default sample of your dummy data for making schema based on that columns name 