const mongoose = require('mongoose');
const MONGO_URI='URL_MONGO';

const connectDB = () => {
  mongoose.set("strictQuery", true);
  const connection = mongoose.connect(MONGO_URI);
  return connection;
};

module.exports = connectDB;