require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ========== Optional Seeding Endpoints ==========

// Add initial holdings
// app.get("/addHoldings", async (req, res) => {
//   const tempHoldings = [ ... ]; // your sample data
//   for (const item of tempHoldings) {
//     const newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss || false,
//     });
//     await newHolding.save();
//   }
//   res.send("Holdings added successfully!");
// });

// Add initial positions
// app.get("/addPositions", async (req, res) => {
//   const tempPositions = [ ... ]; // your sample data
//   for (const item of tempPositions) {
//     const newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss || false,
//     });
//     await newPosition.save();
//   }
//   res.send("Positions added successfully!");
// });

// ========== Actual APIs ==========

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order saved!");
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

// ========== Start Server ==========

app.listen(PORT, async () => {
  try {
    await mongoose.connect(uri);
    console.log(`App running on port ${PORT}`);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
});
