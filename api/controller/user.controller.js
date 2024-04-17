import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.handler.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
  res.send("hello from user router");
};

export const updateUser = async (req, res,next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You cannot update other accounts"));
  try {
    if (req.user.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
