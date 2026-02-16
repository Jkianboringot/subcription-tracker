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

userRoute.get('/:id',(req,res)=>res.send({title:'Delete users'}))


export default userRoute