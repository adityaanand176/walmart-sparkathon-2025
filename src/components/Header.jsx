import React, { useRef } from 'react'
import { MapPin, ChevronDown, Search, ShoppingCart, Camera, X, Upload } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useCart } from './CartContext';
import './Header.css';

function Header({
  searchTerm,
  setSearchTerm,
  searchMode,
  setSearchMode,
  selectedImage,
  setSelectedImage,
  isDragOver,
  setIsDragOver,
  glowActive,
  setGlowActive,
  navigate
}) {
  const fileInputRef = useRef(null);
  const location = useLocation();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Search logic
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchMode === 'text' && searchTerm.trim()) {
      setGlowActive(true);
      setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }, 50);
    } else if (searchMode === 'image' && selectedImage) {
      setGlowActive(true);
      setTimeout(() => {
        navigate(`/search?image=true`);
      }, 50);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!glowActive && e.target.value.length > 0) {
      setGlowActive(true);
    }
  };

  const toggleSearchMode = () => {
    setSearchMode(searchMode === 'text' ? 'image' : 'text');
    setSelectedImage(null);
    setSearchTerm('');
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          file: file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };
  const clearImage = () => {
    setSelectedImage(null);
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <button
              className="text-4xl md:text-5xl font-bold text-yellow-400 focus:outline-none hover:scale-110 transition-transform"
              onClick={() => navigate('/')}
              aria-label="Go to homepage"
              style={{ lineHeight: 1 }}
            >
              ✱
            </button>
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
            <form className="relative" onSubmit={handleSearch}>
              <div className={glowActive ? 'neon-animated-glow' : ''}>
                <div className="neon-search-inner w-full">
                  {/* Search Mode Toggle */}
                  <button
                    type="button"
                    onClick={toggleSearchMode}
                    className="neon-search-icon-btn"
                    title={searchMode === 'text' ? 'Switch to image search' : 'Switch to text search'}
                  >
                    {searchMode === 'text' ? <Search className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                  </button>
                  {/* Text Search Input */}
                  {searchMode === 'text' && (
                    <input
                      type="text"
                      placeholder="Search everything at Walmart online and in store"
                      className="neon-search-input"
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                    />
                  )}
                  {/* Image Search Area */}
                  {searchMode === 'image' && (
                    <div
                      className={`w-full min-h-[40px] flex items-center bg-transparent pl-10`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {selectedImage ? (
                        <div className="flex items-center space-x-2">
                          <img 
                            src={selectedImage.preview} 
                            alt="Selected" 
                            className="w-6 h-6 object-cover rounded"
                          />
                          <span className="text-sm text-gray-600 truncate">
                            {selectedImage.file.name}
                          </span>
                          <button
                            type="button"
                            onClick={clearImage}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">
                            {isDragOver ? 'Drop image here' : 'Drag & drop image or click to upload'}
                          </span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInput}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Browse
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <button type="submit" className="neon-search-submit-btn" disabled={searchMode === 'image' && !selectedImage}>
                    <Search className={`w-5 h-5 ${searchMode === 'image' && !selectedImage ? 'text-gray-400' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>
            </form>
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
            <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
              <div className="text-sm mt-1">${cart.reduce((sum, item) => sum + (item.final_price || 0) * item.quantity, 0).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header