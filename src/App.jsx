import React, { useState } from 'react';
import { ChevronDown, Search, ShoppingCart, User, MapPin, Star } from 'lucide-react';

const WalmartHeroPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const Header = () => (
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
  );

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

  const PromoCard = ({ title, subtitle, buttonText, bgColor, textColor, children, onClick }) => (
    <div className={`${bgColor} ${textColor} rounded-lg overflow-hidden relative h-full`}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {subtitle && <p className="text-sm mb-4">{subtitle}</p>}
          <button 
            onClick={onClick}
            className="text-sm font-semibold underline hover:no-underline"
          >
            {buttonText}
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );

  const MainCarousel = () => (
    <div className="relative bg-blue-400 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-8">
        <div className="text-white">
          <div className="bg-blue-800 text-white px-4 py-2 rounded-lg inline-block mb-4">
            <h2 className="text-3xl font-bold">Walmart</h2>
            <div className="bg-white text-blue-800 px-3 py-1 rounded mt-2">
              <span className="text-xl font-bold">DEALS</span>
            </div>
            <p className="text-sm mt-2">JULY 8-13 ONLY!</p>
          </div>
          <h3 className="text-2xl font-bold mb-2">Don't miss</h3>
          <p className="text-2xl font-bold">up to 30% off!</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold mt-4 hover:bg-gray-100">
            Shop Deals
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-64 h-64 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Tablet</span>
            </div>
          </div>
          <div className="w-32 h-32 bg-red-600 rounded-lg flex items-center justify-center">
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Coffee</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[...Array(6)].map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white p-2 rounded-full">
        ⏸
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-3 space-y-4">
            <PromoCard
              title="Beauty tools, big savings"
              buttonText="Shop Deals"
              bgColor="bg-blue-200"
              textColor="text-gray-800"
              onClick={() => console.log('Beauty tools clicked')}
            >
              <div className="w-24 h-16 bg-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">FOREO</span>
              </div>
            </PromoCard>
            
            <PromoCard
              title="Up to 20% off Resold"
              buttonText="Shop Deals"
              bgColor="bg-blue-200"
              textColor="text-gray-800"
              onClick={() => console.log('Resold clicked')}
            >
              <div className="w-20 h-32 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">Device</span>
              </div>
            </PromoCard>
          </div>
          
          {/* Center Column */}
          <div className="col-span-6">
            <MainCarousel />
          </div>
          
          {/* Right Column */}
          <div className="col-span-3 space-y-4">
            <PromoCard
              title="Up to 25% off baby"
              buttonText="Shop Deals"
              bgColor="bg-blue-200"
              textColor="text-gray-800"
              onClick={() => console.log('Baby clicked')}
            >
              <div className="w-24 h-20 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">Crib</span>
              </div>
            </PromoCard>
            
            <PromoCard
              title="Up to 50% off school supplies"
              buttonText="Shop Deals"
              bgColor="bg-blue-200"
              textColor="text-gray-800"
              onClick={() => console.log('School supplies clicked')}
            >
              <div className="w-20 h-24 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-gray-800 text-xs">Crayola</span>
              </div>
            </PromoCard>
            
            <PromoCard
              title="Up to 30% off bikes & ride-ons"
              buttonText="Shop Deals"
              bgColor="bg-blue-200"
              textColor="text-gray-800"
              onClick={() => console.log('Bikes clicked')}
            >
              <div className="w-20 h-16 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-white text-xs">Bike</span>
              </div>
            </PromoCard>
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-6">
            <PromoCard
              title="Toys up to 50% off"
              buttonText="Shop Deals"
              bgColor="bg-blue-200"
              textColor="text-gray-800"
              onClick={() => console.log('Toys clicked')}
            >
              <div className="w-32 h-24 bg-red-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">Toy Kitchen</span>
              </div>
            </PromoCard>
          </div>
          
          <div className="col-span-6">
            <PromoCard
              title="Up to 65% off"
              buttonText="Shop now"
              bgColor="bg-yellow-200"
              textColor="text-gray-800"
              onClick={() => console.log('65% off clicked')}
            >
              <div className="w-32 h-24 bg-green-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-sm">Surfboard</span>
              </div>
            </PromoCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalmartHeroPage;