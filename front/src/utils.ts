// import { CartItem } from './types/Cart'
// import { Product } from './types/Product'
import { ApiError } from "./types/ApiError"

export const getError = (error: ApiError) => 
    error.response?.data?.message || error.message;


   // export const convertProductToCartItem = (product: Product): CartItem => {
//   const cartItem: CartItem = {
//     _id: product._id,
//     name: product.name,
//     slug: product.slug,
//     image: product.image,
//     price: product.price,
//     countInStock: product.countInStock,
//     quantity: 1,
//   }
//   return cartItem
// }