'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { User, LogOut, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface UserMenuProps {
  user: {
    id: string
    email?: string
    user_metadata?: {
      full_name?: string
    }
  } | null
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        {user?.user_metadata?.full_name || user?.email}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
            <div className="py-1">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium">{user?.user_metadata?.full_name || '用户'}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              
              <Link
                href="/cart"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                购物车
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
              >
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
