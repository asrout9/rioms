const mongoose = require('mongoose');
const conStr = process.env.DBURI;

const connectDB = async () => {
  try {
    await mongoose.connect(conStr);
    console.log('Database connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
