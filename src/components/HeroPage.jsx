import React from 'react';
import Navigation from './Navigation';

// Example product data from CSV
const products = [
  {
    name: "HOBIBEAR Boys and Girls Classic Graphic Garden Clogs",
    image: "https://i5.walmartimages.com/seo/HOBIBEAR-Boys-and-Girls-Classic-Graphic-Garden-Clogs-Slip-on-Water-Shoes-Toddler-Little-Kids-Big-Kids_4d43a2ad-82fd-4d3a-bf33-ba1ee94b9a8e.3e8c2f121263e0433c0d3d8d90a9ae25.jpeg",
    price: "$23.99",
    category: "Boys' Shoes",
    link: "#"
  },
  {
    name: "MaryRuth's Women's Multivitamin Liposomal",
    image: "https://i5.walmartimages.com/seo/MaryRuth-s-USDA-Organic-Women-s-Multivitamin-Liquid-Liposomal-Vanilla-Peach-Sugar-Free-Vegan-15-22-fl-oz_5d303f04-8275-402e-9696-859be58833db.c9f2898f80836e95c54adeb1b360762a.jpeg",
    price: "$24.95",
    category: "Vitamins & Supplements",
    link: "#"
  },
  {
    name: "Amay Grommet Top Blackout Curtain Panel",
    image: "https://i5.walmartimages.com/seo/Amay-Grommet-Top-Blackout-Curtain-Panel-Greyish-White-72-Inch-Wide-by-120-Inch-Long-1Panel_561e2602-7d06-4383-a857-6a5a15f55ac7.8f10fde529278f5fe4211692a6b65d42.jpeg",
    price: "$104.00",
    category: "Curtains",
    link: "#"
  },
  {
    name: "Neutrogena Healthy Skin Glow Perfector Concealer Pen",
    image: "https://i5.walmartimages.com/seo/Neutrogena-Healthy-Skin-Glow-Perfector-Concealer-Pen-Fair-1-oz_8a333b57-9cbd-4709-b427-f8264eb737a4.fea3170542224ac6b947534ea7ce768c.jpeg",
    price: "$12.97",
    category: "Beauty",
    link: "#"
  },
  {
    name: "RBX Boys' Athletic T-Shirt - 2 Pack",
    image: "https://i5.walmartimages.com/seo/RBX-Boys-Athletic-T-Shirt-2-Pack-Active-Performance-Dry-Fit-Sports-Tee-Size-4-16_1e2e2e2e-2e2e-2e2e-2e2e-2e2e2e2e2e2e.2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.jpeg",
    price: "$13.48",
    category: "Boys' Clothing",
    link: "#"
  }
];

const categories = [
  { name: "Shoes", icon: "👟" },
  { name: "Vitamins", icon: "💊" },
  { name: "Curtains", icon: "🪟" },
  { name: "Beauty", icon: "💄" },
  { name: "Clothing", icon: "👕" },
];

const HeroPage = () => {
  return (
    <div className="flex-grow flex flex-col bg-gray-50 min-h-screen">
      <Navigation />
      {/* Product Carousel */}
      <section className="w-full bg-blue-600 py-8 px-2 md:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 ml-2">Featured Products</h2>
        <div className="flex overflow-x-auto space-x-6 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 pb-4">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="min-w-[260px] max-w-xs bg-white rounded-2xl shadow-lg flex flex-col items-center p-4 hover:scale-105 transition-transform duration-200"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-40 object-contain mb-3 rounded-xl bg-gray-50"
                draggable="false"
              />
              <div className="font-bold text-gray-800 text-lg mb-1 text-center line-clamp-2">{product.name}</div>
              <div className="text-blue-600 font-semibold text-xl mb-2">{product.price}</div>
              <a
                href={product.link}
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Shop Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="max-w-7xl mx-auto w-full py-10 px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Deals of the Day</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-28 w-28 object-contain mb-2 rounded-lg bg-gray-50"
                draggable="false"
              />
              <div className="font-semibold text-gray-700 text-center line-clamp-2 mb-1">{product.name}</div>
              <div className="text-blue-600 font-bold mb-2">{product.price}</div>
              <a
                href={product.link}
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