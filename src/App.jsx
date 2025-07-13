import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PromoCard from './components/PromoCard';
import MainCarousel from './components/MainCarousel';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import HeroPage from './components/HeroPage';

const App = () => (
  <>
  <CartProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  </CartProvider>
  </>
);

export default App;