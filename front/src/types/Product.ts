import { Key } from "react"

export type Product = {
    [x: string]: Key | null | undefined
    _id: string
    name: string
    slug: string
    image: string
    category: string
    brand: string
    price: number
    countInStock: number
    description: string
    rating: number
    numReviews: number
  }