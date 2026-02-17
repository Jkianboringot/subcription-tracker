import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is requiered"],
    trim: true, //remove space before and after
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "User Email is requiered"],
    trim: true, //remove space before and after
    lowercase:true,
    unique:true,
    minLength: 5,
    maxLength: 255,
    match:[/\S+@\S+\.\S+/,'please fill a valid email address']
  },
  password:{
     type: String,
    required: [true, "User Password is requiered"],
    minLength: 5,
  }
},{timestamps:true});


const User= mongoose.model('User',userSchema)

export default User;


//weird that this is craete in model in laravle this is in controller