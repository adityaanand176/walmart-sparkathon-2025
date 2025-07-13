import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import HeroPage from './components/HeroPage';
import Footer from './components/Footer';

const App = () => (
  <div className="flex flex-col min-h-screen">
    <CartProvider>
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      <Footer />
    </CartProvider>
  </div>
);

export default App;