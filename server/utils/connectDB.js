const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('MongoDB connected!');
  } catch (error) {
    console.log('MongoDB connection failed.', error);
  }
};

module.exports = connectDB;
