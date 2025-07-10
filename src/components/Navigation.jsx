import React from 'react';
import { ChevronDown } from 'lucide-react';

const Navigation = () => (
  <nav className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center space-x-8 py-3">
        <div className="flex items-center space-x-2 text-gray-700">
          <div className="grid grid-cols-3 gap-1 w-6 h-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>
            ))}
          </div>
          <span className="font-medium">Departments</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <div className="grid grid-cols-3 gap-1 w-6 h-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>
            ))}
          </div>
          <span className="font-medium">Services</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="text-gray-700 hover:text-blue-600">Get it Fast</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">New Arrivals</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Deals</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Dinner Made Easy</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Pharmacy Delivery</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Trending</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Swim Shop</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">My Items</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Auto Service</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Walmart+</a>
        </div>
        <div className="ml-auto">
          <span className="text-gray-700">More</span>
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </div>
      </div>
    </div>
  </nav>
);

export default Navigation;
