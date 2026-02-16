import { Router } from "express";

const subRoute = Router()

subRoute.get('/',(req,res)=>res.send({titile:'GET all subscriptions'}))

subRoute.get('/:id',(req,res)=>res.send({titile:'GET details'}))

subRoute.post('/',(req,res)=>res.send({titile:'Create subscriptions'}))

subRoute.put('/',(req,res)=>res.send({titile:'Update subscriptions'}))

subRoute.delete('/',(req,res)=>res.send({titile:'Delete subscriptions'}))

subRoute.get('/user/:id',(req,res)=>res.send({titile:'GET all user subscriptions'}))

subRoute.put('/:id/cancel',(req,res)=>res.send({titile:'Cancel subscriptions'}))

subRoute.get('/get-renewal',(req,res)=>res.send({titile:'GET upcoming renewals'}))


export default subRoute