require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('Error: MONGODB_URI is not defined in environment variables');
      console.error('Please create a .env file with MONGODB_URI');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('\n💡 Troubleshooting tips:');
    console.error('1. Check your MONGODB_URI in .env file');
    console.error('2. Verify your password is correct');
    console.error('3. Check if your IP is whitelisted in MongoDB Atlas');
    console.error('4. Verify database user has correct permissions');
    process.exit(1);
  }
};

module.exports = connectDB;

