'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CartItem } from '@/types'
import { createClient } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchUserAndCart()
  }, [])

  const fetchUserAndCart = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data, error } = await supabase
          .from('cart_items')
          .select(`
            *,
            product:products(*)
          `)
          .eq('user_id', user.id)

        if (error) throw error
        setCartItems(data || [])
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId)
      return
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId)

      if (error) throw error

      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      )
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

      if (error) throw error

      setCartItems(items => items.filter(item => item.id !== itemId))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const clearCart = async () => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      if (error) throw error
      setCartItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle>请先登录</CardTitle>
              <CardDescription>
                您需要登录才能查看购物车
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/">去登录</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">购物车</h1>
          {cartItems.length > 0 && (
            <Button variant="outline" onClick={clearCart}>
              清空购物车
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">购物车是空的</h2>
              <p className="text-gray-500 mb-6">添加一些商品开始购物吧！</p>
              <Button asChild>
                <Link href="/">继续购物</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                          {item.product.category}
                        </p>
                        <p className="text-blue-600 font-semibold">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>订单摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>商品数量</span>
                    <span>{totalItems} 件</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>商品总价</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>运费</span>
                    <span className="text-green-600">免费</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>总计</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    去结算
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/">继续购物</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
