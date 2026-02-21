import express from 'express'

import { PORT } from './config/env.js'

import userRoute from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import subRoute from './routes/subcripstion.route.js'


import errorMiddleware from './middlewares/error.middleware.js'

import condb from './database/mongodb.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/subs',subRoute)

app.use(errorMiddleware)

app.get('/',(req,res)=>
res.send('welcome you fuck '))

app.listen(PORT,async()=>{
    console.log(`SUbShit API is running on http://localhost:${PORT}`)
    
    await condb()

})

export default app