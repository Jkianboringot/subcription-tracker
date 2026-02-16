import express from 'express'

import { PORT } from './config/env.js'

import userRoute from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import subRoute from './routes/subcripstion.route.js'

const app = express()

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/subs',subRoute)

app.get('/',(req,res)=>
res.send('welcome you fuck '))

app.listen(PORT,()=>{
    console.log(`SUbShit API is running on http://localhost:${PORT}`)
})

export default app