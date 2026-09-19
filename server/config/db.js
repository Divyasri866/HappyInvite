const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    isConnected = true;
    return conn;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Notice: Could not connect to ${process.env.MONGO_URI} (${error.message}).`);
    console.log('💡 Running with In-Memory Data Store. Set valid MONGO_URI in server/.env to use external MongoDB.');
    isConnected = false;
    return null;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
