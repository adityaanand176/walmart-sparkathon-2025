import React from 'react'
import { MapPin, ChevronDown, Search, ShoppingCart } from 'lucide-react';
function Header() {
  return (
    <header className="bg-blue-600 text-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-yellow-400">✱</div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <div>
              <p className="text-sm">Pickup or delivery?</p>
              <p className="text-xs opacity-80">Sacramento, 95829 • Sacramento Supe...</p>
            </div>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search everything at Walmart online and in store"
              className="w-full py-2 px-4 rounded-full text-gray-800 pr-12"
            />
            <Search className="absolute right-4 top-2.5 w-5 h-5 text-gray-600" />
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-xs">Reorder</div>
            <div className="text-sm font-semibold">My Items</div>
          </div>
          <div className="text-center">
            <div className="text-xs">Sign In</div>
            <div className="text-sm font-semibold">Account</div>
          </div>
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              0
            </span>
            <div className="text-sm mt-1">$0.00</div>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header