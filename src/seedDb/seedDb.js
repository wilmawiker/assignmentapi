require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { products } = require("./products");

const populateDbWithMockData = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    const productRes = await Product.create(products);

    console.log("Database successfully populated with products");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithMockData();
