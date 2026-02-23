import mongoose from "mongoose";
import User from '../models/user.model.js'
import bcrypt from "bcryptjs";

import jwt from 'jsonwebtoken'

import {JWT_EXPIRES_IN,JWT_SECRET} from '../config/env.js'

export const signUp = async (req, res, next) => {
    const session =await mongoose.startSession()// a session fo mongoose transaction
    session.startTransaction() //this is just like laravel sql transaction the atomic thing

    try {
        
        const {name,email,pass}=req.body

        const existingUser=await User.findOne({email})

        if(existingUser){
            const error= new Error('User already exists')
                error.statusCode=409
            throw error
        }

        // hash password
        const salt =await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(pass,salt)

        const newUser=await user.create([{name,email,pass:hashPassword}],{session})


        const token=jwt.sign({userId:newUser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})





        await session.commitTransaction()
        session.endSession()


        res.status(201).json({
            success:true,
            message:'User created successfuly',
            data:{
                token,user:newUser[0]
            }
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }

};

export const signIn = async (req, res, next) => {};

export const signOut = async (req, res, next) => {};
