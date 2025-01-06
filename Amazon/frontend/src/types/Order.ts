import { CartItem } from './cart'

export type Order = {
  _id: string
  orderItems: CartItem[]
  // ...existing code...
}
