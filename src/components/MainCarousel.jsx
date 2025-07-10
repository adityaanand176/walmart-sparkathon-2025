import React from 'react';

const MainCarousel = ({ currentSlide, setCurrentSlide }) => (
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

export default MainCarousel;
