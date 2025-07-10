import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PromoCard from './components/PromoCard';
import MainCarousel from './components/MainCarousel';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';

const WalmartHeroPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
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
            <MainCarousel currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
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

const App = () => (
  <Routes>
    <Route path="/" element={<WalmartHeroPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/product/:id" element={<ProductPage />} />
  </Routes>
);

export default App;