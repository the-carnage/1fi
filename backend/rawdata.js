const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URI;

const alldata = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ DB Connected");

    const data = await Product.find();
    console.log(data);

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

alldata();