'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserMenu } from '@/components/auth/user-menu'
import { AuthForm } from '@/components/auth/auth-form'
import { Search, ShoppingCart, Menu, X, Store } from 'lucide-react'

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // 获取购物车商品数量
        const { data: cartItems } = await supabase
          .from('cart_items')
          .select('quantity')
          .eq('user_id', user.id)
        
        const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0
        setCartCount(totalItems)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          // 重新获取购物车数量
          getUser()
        } else {
          setCartCount(0)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const toggleAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">在线商店</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
                首页
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-blue-600 transition-colors">
                商品
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="搜索商品..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                  />
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* User Menu or Auth Buttons */}
              {user ? (
                <UserMenu user={user} />
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAuthModal('signin')}
                  >
                    登录
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => toggleAuthModal('signup')}
                  >
                    注册
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t py-4">
              <div className="space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="搜索商品..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4"
                    />
                  </div>
                </form>

                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block px-3 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    首页
                  </Link>
                  <Link
                    href="/products"
                    className="block px-3 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    商品
                  </Link>
                </div>

                {/* Mobile Auth Buttons */}
                {!user && (
                  <div className="space-y-2 pt-4 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        toggleAuthModal('signin')
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      登录
                    </Button>
                    <Button
                      className="w-full justify-start"
                      onClick={() => {
                        toggleAuthModal('signup')
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      注册
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 z-10"
              onClick={() => setShowAuthModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <AuthForm
              mode={authMode}
              onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            />
          </div>
        </div>
      )}
    </>
  )
}
