import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:"./.env"})
import app from "./app.js"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB()

const PORT = process.env.PORT || 3000
app.listen(PORT,() => {console.log(`Server running on port ${PORT}`)})

