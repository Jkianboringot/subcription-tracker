import { Router } from "express";

const userRoute= Router()

// static route
// GET /user -> get all user

// dynamic route
// GET /user:id -> get user with this id

userRoute.get('/',(req,res)=>res.send({title:'Get all users'}))
userRoute.get('/:id',(req,res)=>res.send({title:'Get user detail'}))

userRoute.post('/',(req,res)=>res.send({title:'Create User'}))

userRoute.put('/:id',(req,res)=>res.send({title:'Update users'}))

userRoute.delete('/:id',(req,res)=>res.send({title:'Delete users'}))


export default userRoute
//just like in python main = __name__ its lets other file to access to this files function and
// variable