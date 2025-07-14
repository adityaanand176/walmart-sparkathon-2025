import React, { useEffect, useState, useRef } from 'react';
import Navigation from './Navigation';

const categories = [
  { name: "Shoes", icon: "👟" },
  { name: "Vitamins", icon: "💊" },
  { name: "Curtains", icon: "🪟" },
  { name: "Beauty", icon: "💄" },
  { name: "Clothing", icon: "👕" },
];

const HERO_INTERVAL = 5000; // ms (5 seconds)

const HeroPage = () => {
  const [products, setProducts] = useState([]);
  const [heroIdx, setHeroIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  // Load products from dummydaata.json
  useEffect(() => {
    fetch('/dummydaata.json')
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  // Auto-advance hero carousel with fade transition
  useEffect(() => {
    if (products.length === 0) return;
    intervalRef.current = setInterval(() => {
      setFade(false); // Start fade out
      fadeTimeoutRef.current = setTimeout(() => {
        setHeroIdx((idx) => (idx + 1) % products.length);
        setFade(true); // Fade in new product
      }, 400); // Fade out duration
    }, HERO_INTERVAL);
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, [products]);

  // Show only one product at a time in hero
  const heroProduct = products[heroIdx] || null;

  return (
    <div className="flex-grow flex flex-col bg-gray-50 min-h-screen">
      <Navigation />
      {/* Auto-scrolling Hero Section with fade transition */}
      <section className="w-full bg-blue-600 py-10 px-2 md:px-8 flex items-center justify-center min-h-[340px] relative overflow-hidden">
        {heroProduct && (
          <div
            className={`flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Left: Text */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 drop-shadow-lg line-clamp-2">
                {heroProduct.title}
              </h1>
              <p className="text-lg text-white mb-2 max-w-lg line-clamp-2">{heroProduct.description}</p>
              <div className="text-2xl font-bold text-white mb-4">${heroProduct.price}</div>
              <a
                href="#"
                className="inline-block bg-white text-blue-600 text-lg font-bold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
              >
                Shop Now
              </a>
            </div>
            {/* Right: Image */}
            <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0 z-10">
              <img
                src={heroProduct.thumbnail || heroProduct.images?.[0]}
                alt={heroProduct.title}
                className="h-48 md:h-72 w-auto object-contain drop-shadow-2xl rounded-xl bg-white p-2"
                draggable="false"
              />
            </div>
          </div>
        )}
        {/* Decorative background shape */}
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-blue-800 opacity-30 rounded-full blur-3xl z-0" />
      </section>

      {/* Deals of the Day */}
      <section className="max-w-7xl mx-auto w-full py-10 px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Deals of the Day</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, idx) => (
            <div
              key={product.id || idx}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={product.thumbnail || product.images?.[0]}
                alt={product.title}
                className="h-28 w-28 object-contain mb-2 rounded-lg bg-gray-50"
                draggable="false"
              />
              <div className="font-semibold text-gray-700 text-center line-clamp-2 mb-1">{product.title}</div>
              <div className="text-blue-600 font-bold mb-2">${product.price}</div>
              <a
                href="#"
                className="text-sm text-blue-600 font-semibold hover:underline"
              >
                Shop Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="w-full bg-white py-8 px-2 md:px-8 border-t">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 ml-2">Shop by Category</h3>
        <div className="flex space-x-8 overflow-x-auto pb-2">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center min-w-[120px] bg-blue-50 rounded-xl p-4 shadow hover:bg-blue-100 transition"
            >
              <span className="text-4xl mb-2">{cat.icon}</span>
              <span className="font-semibold text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroPage;