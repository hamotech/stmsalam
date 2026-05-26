import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stmapp';
  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    });
    console.log(`\n💚 [MongoDB] Connected successfully to ${mongoose.connection.name}`);
  } catch (error) {
    console.error(`\n❌ [MongoDB] Connection error:`, error.message);
    process.exit(1);
  }
};

export default connectDB;
