import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";
import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists, Please try login",
        data: checkExistingUser,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const newlyCreatedUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      });

      if (!newlyCreatedUser) {
        return res.status(404).json({
          success: false,
          message: "Problem Occurred, User didn't created or registered",
        });
      }

      return res.status(201).json({
        success: true,
        message: "User created or registered successfully",
        data: newlyCreatedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        message: "Problem Occurred, User didn't created or registered",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Side Error Occurred",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User didn't exixts, Please Register first",
      });
    }

    const isPaaswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPaaswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.status(201).json({
      success: true,
      message: "User Logged In Successfully",
      data: user,
      accessToken: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Side Error Occurred",
    });
  }
};
