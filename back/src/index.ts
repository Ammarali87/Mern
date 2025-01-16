import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { productRouter } from './routs/prodcutRoute' // Corrected import name
import { CartModel } from './moduls/cartModel'
import { seedRouter } from './routs/seedRoute'
import { userRouter } from './routs/userRoute'
import { ProductModel } from './moduls/productModel'

dotenv.config()

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazonadb'
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB') // Improved logging
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error) // More specific error logging
  })

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'], // Make sure this matches your frontend URL
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/seed', seedRouter)

app.use(express.static(path.join(__dirname, '../../front'))) // Ensure correct static file path

app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../front/index.html')) // Make sure index.html is being served
)

productRouter.post(
  '/cart',
  asyncHandler(async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body
    const product = await ProductModel.findById(productId)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    let cart = await CartModel.findOne({ user: userId })

    if (!cart) {
      cart = new CartModel({
        user: userId,
        items: [{ productId, quantity }],
      })
    } else {
      const item = cart.items.find((x) => x.productId.toString() === productId)
      if (item) {
        item.quantity += quantity
      } else {
        cart.items.push({ productId, quantity })
      }
    }

    await cart.save()
    res.status(200).json(cart)
  })
)

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})

// Correctly implement asyncHandler
function asyncHandler(
  fn: (req: Request, res: Response) => Promise<Response | undefined>
): express.RequestHandler {
  return (req: Request, res: Response, next) => {
    fn(req, res).catch(next) // Pass errors to the default error handler
  }
}
