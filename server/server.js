import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import express from 'express'
import { connectDB } from './database/mongo.js'
import authRouter from './routes/auth.routes.js'
import messageRouter from './routes/message.routes.js'
import userRouter from './routes/user.routes.js'

config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', messageRouter)
app.use('/api/v1/user', userRouter)

app.get('/test', (req, res) => {
    res.status(200).send('<h1>Working Properly</h1>')
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

export { app }
