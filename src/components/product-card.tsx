'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!onAddToCart) return
    
    setIsAdding(true)
    try {
      await onAddToCart(product.id)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500">
              库存: {product.stock}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAdding ? '添加中...' : product.stock === 0 ? '缺货' : '加入购物车'}
        </Button>
      </CardFooter>
    </Card>
  )
}
