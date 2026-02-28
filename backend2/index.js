require("dotenv").config();

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();
const { PositionsModel } = require("./model/PositionsModel.js");
const { HoldingsModel } = require("./model/HoldingsModel.js");
const { OrdersModel } = require("./model/OrdersModel.js");
const { WalletModel } = require("./model/WalletModel.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./model/UserModel.js");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

/* ================= DATABASE CONNECTION ================= */

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("DATABASE CONNECTED");

    // Auto-create wallet if not exists
    const existingWallet = await WalletModel.findOne();
    if (!existingWallet) {
      await WalletModel.create({ balance: 100000 });
      console.log("Wallet created with ₹100000");
    }
  })
  .catch((err) => console.log("DB ERROR:", err.message));

  
/* ================= WALLET ROUTES ================= */

app.get("/balance", async (req, res) => {
  try {
    const wallet = await WalletModel.findOne();
    res.json({ balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/addfunds", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const wallet = await WalletModel.findOne();
    wallet.balance += Number(amount);
    await wallet.save();

    res.json({ balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/withdraw", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const wallet = await WalletModel.findOne();

    if (wallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    wallet.balance -= Number(amount);
    await wallet.save();

    res.json({ balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET HOLDINGS ================= */

app.get("/allholdings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= GET ALL POSITIONS ================= */

app.get("/allpositions", async (req, res) => {
  try {
    const positions = await PositionsModel.find({});
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= GET ALL ORDERS ================= */

app.get("/allorders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({}).sort({ _id: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= PORTFOLIO SUMMARY ================= */

app.get("/portfoliosummary", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    const wallet = await WalletModel.findOne();

    let totalInvested = 0;
    let currentValue = 0;

    holdings.forEach((stock) => {
      totalInvested += stock.qty * stock.avg;
      currentValue += stock.qty * stock.price;
    });

    const totalPnL = currentValue - totalInvested;

    const pnlPercent =
      totalInvested === 0
        ? 0
        : ((totalPnL / totalInvested) * 100).toFixed(2);

    res.json({
      totalInvested,
      currentValue,
      totalPnL,
      pnlPercent,
      walletBalance: wallet.balance,
      holdingsCount: holdings.length,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= TRADE ANALYTICS ================= */

app.get("/tradeanalytics", async (req, res) => {
  try {
    const orders = await OrdersModel.find({});

    let totalTrades = orders.length;
    let totalBuyValue = 0;
    let totalSellValue = 0;

    const stockStats = {};

    orders.forEach((order) => {
      const tradeValue = order.qty * order.price;

      if (order.mode === "CNC" || order.mode === "MIS") {
        totalBuyValue += tradeValue;
      }

      if (order.mode === "SELL" || order.mode === "MIS-CLOSE") {
        totalSellValue += tradeValue;
      }

      // Track per stock
      if (!stockStats[order.name]) {
        stockStats[order.name] = 0;
      }

      if (order.mode === "MIS-CLOSE") {
        stockStats[order.name] += tradeValue;
      }
    });

    const realizedPnL = totalSellValue - totalBuyValue;

    // Best & Worst stock
    let bestStock = null;
    let worstStock = null;
    let max = -Infinity;
    let min = Infinity;

    Object.keys(stockStats).forEach((stock) => {
      if (stockStats[stock] > max) {
        max = stockStats[stock];
        bestStock = stock;
      }

      if (stockStats[stock] < min) {
        min = stockStats[stock];
        worstStock = stock;
      }
    });

    res.json({
      totalTrades,
      totalBuyValue,
      totalSellValue,
      realizedPnL,
      bestStock,
      worstStock,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= BUY ORDER ================= */
app.post("/neworder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const quantity = Number(qty);
    const stockPrice = Number(price);

    if (!quantity || !stockPrice) {
      return res.status(400).json({ error: "Invalid trade data" });
    }

    const wallet = await WalletModel.findOne();

    /* ================= CNC (DELIVERY) ================= */
    if (mode === "CNC") {

      const totalCost = quantity * stockPrice;

      if (wallet.balance < totalCost) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      wallet.balance -= totalCost;
      await wallet.save();

      const existing = await HoldingsModel.findOne({ name });

      if (existing) {
        const totalOld = existing.qty * existing.avg;
        const totalNew = quantity * stockPrice;

        existing.qty += quantity;
        existing.avg = (totalOld + totalNew) / existing.qty;
        await existing.save();
      } else {
        await HoldingsModel.create({
          name,
          qty: quantity,
          avg: stockPrice,
          price: stockPrice,
          net: "0%",
          day: "0%",
        });
      }
    }

    /* ================= MIS (INTRADAY) ================= */
    if (mode === "MIS") {

      const marginRequired = quantity * stockPrice * 0.2; // 20% margin

      if (wallet.balance < marginRequired) {
        return res.status(400).json({ error: "Insufficient margin" });
      }

      wallet.balance -= marginRequired;
      await wallet.save();

      await PositionsModel.create({
        product: "MIS",
        name,
        qty: quantity,
        avg: stockPrice,
        price: stockPrice,
        net: "0%",
        day: "0%",
        isLoss: false,
      });
    }

    await OrdersModel.create({ name, qty: quantity, price: stockPrice, mode });

    res.json({ message: "Order placed", balance: wallet.balance });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= SELL ORDER ================= */

app.post("/sellorder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const quantity = Number(qty);
    const stockPrice = Number(price);
    const totalGain = quantity * stockPrice;

    if (!quantity || !stockPrice) {
      return res.status(400).json({ error: "Invalid trade data" });
    }

    const existing = await HoldingsModel.findOne({ name });

    if (!existing) {
      return res.status(400).json({ error: "No holding found" });
    }

    if (existing.qty < quantity) {
      return res.status(400).json({ error: "Not enough quantity" });
    }

    // Save order
    await OrdersModel.create({ name, qty: quantity, price: stockPrice, mode });

    // Update holdings
    if (existing.qty === quantity) {
      await HoldingsModel.deleteOne({ name });
    } else {
      existing.qty -= quantity;
      await existing.save();
    }

    // Credit wallet
    const wallet = await WalletModel.findOne();
    wallet.balance += totalGain;
    await wallet.save();

    res.json({ message: "Sell successful", balance: wallet.balance });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= CLOSE POSITION (MIS) ================= */

app.post("/closeposition", async (req, res) => {
  try {
    const { id } = req.body;

    const position = await PositionsModel.findById(id);

    if (!position) {
      return res.status(404).json({ error: "Position not found" });
    }

    const invested = position.qty * position.avg;
    const currentValue = position.qty * position.price;

    const pnl = currentValue - invested;

    const marginUsed = invested * 0.2; // same 20% margin

    const wallet = await WalletModel.findOne();

    // Refund margin
    wallet.balance += marginUsed;

    // Add or subtract P&L
    wallet.balance += pnl;

    await wallet.save();

    // Save closing order
    await OrdersModel.create({
      name: position.name,
      qty: position.qty,
      price: position.price,
      mode: "MIS-CLOSE",
    });

    // Remove position
    await PositionsModel.findByIdAndDelete(id);

    res.json({
      message: "Position closed successfully",
      balance: wallet.balance,
      pnl,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= REAL-TIME PRICE STREAM ================= */

const symbols = ["INFY.NS", "TCS.NS", "RELIANCE.NS", "WIPRO.NS", "SBIN.NS"];

setInterval(async () => {
  try {
    const quotes = await Promise.all(
      symbols.map((symbol) => yahooFinance.quote(symbol))
    );

    quotes.forEach(async (quote, index) => {
      const symbol = symbols[index].replace(".NS", "");

      io.emit("priceUpdate", {
        symbol,
        price: quote.regularMarketPrice,
        percent: quote.regularMarketChangePercent,
      });

      // await HoldingsModel.updateOne(
      //   { name: symbol },
      //   { price: quote.regularMarketPrice }
      // );
      await HoldingsModel.updateOne(
  { name: symbol },
  { price: quote.regularMarketPrice }
);

await PositionsModel.updateMany(
  { name: symbol },
  { price: quote.regularMarketPrice }
);
    });

  } catch (err) {
    console.log("Yahoo error:", err.message);
  }
}, 5000);

/* ================= SERVER START ================= */

server.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});