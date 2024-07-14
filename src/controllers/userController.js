import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = generateToken(user._id);
  const options = {
    httpOnly:true,
    secure:true
  }

  if (user) {
    res.status(201).cookie("accessToken", token,options).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const token= generateToken(user._id)
  const options={
    httpOnly:true,
    secure:true
   }

  if (user && (await user.matchPassword(password))) {
    
    res.cookie("accessToken",token,options).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
