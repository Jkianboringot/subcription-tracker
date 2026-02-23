import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession(); // a session fo mongoose transaction
  session.startTransaction(); //this is just like laravel sql transaction the atomic thing

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [{ name, email, password: hashPassword }],
      { session },
    );

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfuly",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  // transaction is not really needed hear becuase we are not delete,updating, or creating we are
  // just adding login wether the user can login or not
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // check wether user does not exist we say it must singuUp first
    if (!user) {
      const error = new Error("User not Found");
      error.statusCode = 404;
      throw error;
    }

    // if we pass the if statement, it means user exist, so now all we have to do i validate
    // if he is the user thourgh passworkd

    const isPass = await bcrypt.compare(password, user.password);

    if (!isPass) {
      const error = new Error("INvalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
        success:true,
        message:'User signed in successfully',
        data:{
            token,
            user
        }
    })
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
