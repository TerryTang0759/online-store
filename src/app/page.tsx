'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Product } from '@/types'
import { createClient } from '@/lib/supabase'
import { Search, Filter } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [searchQuery, selectedCategory])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let query = supabase.from('products').select('*')

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
      }

      if (selectedCategory) {
        query = query.eq('category', selectedCategory)
      }

      const { data, error } = await query
      
      if (error) throw error
      
      setProducts(data || [])
      
      // 获取所有分类
      const { data: categoryData } = await supabase
        .from('products')
        .select('category')
        .not('category', 'is', null)
      
      const uniqueCategories = [...new Set(categoryData?.map(item => item.category) || [])]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('请先登录')
        return
      }

      const { error } = await supabase
        .from('cart_items')
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity: 1
        })

      if (error) throw error
      alert('已添加到购物车！')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('添加失败，请重试')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            欢迎来到在线商店
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            发现优质商品，享受便捷购物体验
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">
                浏览商品
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
              了解更多
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="搜索商品..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded-md bg-white"
              >
                <option value="">所有分类</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {searchQuery ? `搜索结果: "${searchQuery}"` : '热门商品'}
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">没有找到商品</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
              }}>
                清除筛选
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">在线商店</h3>
              <p className="text-gray-400">
                为您提供优质的商品和便捷的购物体验
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">首页</Link></li>
                <li><Link href="/products" className="hover:text-white">商品</Link></li>
                <li><Link href="/cart" className="hover:text-white">购物车</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">客户服务</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">帮助中心</a></li>
                <li><a href="#" className="hover:text-white">联系我们</a></li>
                <li><a href="#" className="hover:text-white">退换货政策</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">关注我们</h3>
              <p className="text-gray-400">
                获取最新商品信息和优惠活动
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 在线商店. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
