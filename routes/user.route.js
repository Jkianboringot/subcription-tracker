import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRoute= Router()




// static route
// GET /user -> get all user

// dynamic route
// GET /user:id -> get user with this id

userRoute.get('/',getUsers)
userRoute.get('/:id',authorize,getUser)
                    //middleware, this cna be change aslong it has next() in function

userRoute.post('/',(req,res)=>res.send({title:'Create User'}))

userRoute.put('/:id',(req,res)=>res.send({title:'Update users'}))

userRoute.delete('/:id',(req,res)=>res.send({title:'Delete users'}))


export default userRoute
//just like in python main = __name__ its lets other file to access to this files function and
// variable