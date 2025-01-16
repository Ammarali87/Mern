import { Key, ReactNode } from "react"

export type Product = {
    title: ReactNode
    count: number
    id: Key | null | undefined
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