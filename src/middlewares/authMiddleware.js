import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  
  const token = req.cookies?.accessToken || 
  req.header("Authorization")?.replace("Bearer ","")

  console.log(token);
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
    try {
      // token = req.headers.authorization.split(' ')[1];


      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      console.log(req.user);

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }

  
};

