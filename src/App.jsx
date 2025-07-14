import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import HeroPage from './components/HeroPage';
import Footer from './components/Footer';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('text');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [glowActive, setGlowActive] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <CartProvider>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          glowActive={glowActive}
          setGlowActive={setGlowActive}
          navigate={navigate}
        />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/search" element={<SearchPage
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchMode={searchMode}
              setSearchMode={setSearchMode}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              isDragOver={isDragOver}
              setIsDragOver={setIsDragOver}
              glowActive={glowActive}
              setGlowActive={setGlowActive}
              navigate={navigate}
            />} />
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