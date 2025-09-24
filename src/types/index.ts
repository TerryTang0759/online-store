export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  created_at: string
}

export interface CartItem {
  id: string
  product_id: string
  quantity: number
  product: Product
}

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
}
