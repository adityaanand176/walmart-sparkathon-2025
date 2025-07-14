import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import HeroPage from './components/HeroPage';
import Footer from './components/Footer';

const App = () => {
  const [glowActive, setGlowActive] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <CartProvider>
        <Header glowActive={glowActive} setGlowActive={setGlowActive} />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/search" element={<SearchPage glowActive={glowActive} setGlowActive={setGlowActive} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </div>
  );
};

export default App;