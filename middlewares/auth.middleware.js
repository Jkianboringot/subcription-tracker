import { JWT_SECRET } from "../config/env.js"
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


// use case, let say for example someone is trying to make a request for user 2, but to get it
// we need to be sure that the one making the request is allowed for it like admin, so this middleware
// handles that by verifing if the user have the correct token or like in ims have the correct
// permission,if they do then they are givin access the user details 
const authorize=async (req,res,next)=>{
    try {
        let token

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1]
        }


        if(!token) return res.status(401).json({message:'Unauthorized'})

        const decoded=jwt.verify(token,JWT_SECRET)

        const user=await User.findById(decoded.userId)

        if(!user) return res.status(401).json({message:'Unauthorized'})

        req.user=user

        next()
    } catch (error) {
        res.status(401).json({message:'Unauthorized',error:error.message})
    }
}

export default authorize