import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return 
  }

  try{
    await mongoose.connect(process.env.MONGO_URI, {
      dbName:"share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Could not connect to MongoDB', error.message);
    // process.exit(1);
  }
};