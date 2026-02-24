import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js"
import {createSub, getUserSubs} from '../controllers/sub.controller.js'

const subRoute = Router()

subRoute.get('/',(req,res)=>res.send({titile:'GET all subscriptions'}))

subRoute.get('/:id',(req,res)=>res.send({titile:'GET details'}))

subRoute.post('/',authorize,createSub)

subRoute.put('/',(req,res)=>res.send({titile:'Update subscriptions'}))

subRoute.delete('/',(req,res)=>res.send({titile:'Delete subscriptions'}))

subRoute.get('/user/:id',authorize,getUserSubs)

subRoute.put('/:id/cancel',(req,res)=>res.send({titile:'Cancel subscriptions'}))

subRoute.get('/get-renewal',(req,res)=>res.send({titile:'GET upcoming renewals'}))


export default subRoute