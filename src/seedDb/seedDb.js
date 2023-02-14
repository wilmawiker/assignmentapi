require("dotenv").config();
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const { cart } = require("./cart");

const populateDbWithMockData = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Cart.deleteMany();

    const cartRes = await Cart.create(cart);

    console.log("Database successfully populated with test data");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData();
