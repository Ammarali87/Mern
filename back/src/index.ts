import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import path from 'path'
// import { keyRouter } from "./routs/keyRoute"
// import { orderRouter } from './routs/orderRoute'
import { productRouter } from './routs/prodcutRoute'
import { seedRouter } from './routs/seedRoute'
import { userRouter } from './routs/userRoute'

// put env in parent folder

dotenv.config()

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazonadb'
mongoose.set('strictQuery', true)
mongoose  
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
// app.use('/api/orders', orderRouter)
app.use('/api/seed', seedRouter)
// app.use('/api/keys', keyRouter)

app.use(express.static(path.join(__dirname, '../../front')))
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../front'))
)

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})