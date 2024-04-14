import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const signup = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = User({ userName, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created successfully");
  } catch (error) {
    next(error);
  }
};
