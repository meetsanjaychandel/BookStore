import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"

const app = express();
app.use(cors({origin:"*",
credentials:true
}))
app.use(cookieParser())
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes);

export default  app;