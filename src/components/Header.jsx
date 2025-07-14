import React, { useRef } from 'react'
import { MapPin, ChevronDown, Search, ShoppingCart, Camera, X, Upload, ArrowUp } from 'lucide-react';
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
  const [mode, setMode] = React.useState('camera'); // 'camera', 'image', or 'search'

  // Search logic
  const handleSearch = (e) => {
    e.preventDefault();
    if (mode === 'search' && searchTerm.trim()) {
      setGlowActive(true);
      setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }, 50);
    } else if (mode === 'search' && selectedImage) {
      setGlowActive(true);
      setTimeout(() => {
        navigate(`/search?image=true`);
      }, 50);
    }
  };

  // New: handle right button click
  const handleRightButtonClick = (e) => {
    if (mode === 'camera') {
      // Switch to image mode (do NOT open file dialog)
      setGlowActive(true);
      setMode('image');
      setSearchTerm('');
      setSelectedImage(null);
    } else if (mode === 'image') {
      // Switch back to camera mode
      setMode('camera');
      setSelectedImage(null);
      setSearchTerm('');
    } else if (mode === 'search' && searchTerm.length > 0) {
      // Submit text search
      handleSearch(e);
    }
  };

  // When file is uploaded, stay in image mode
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
      setMode('image');
    }
  };

  // When user types, ensure mode is 'search'
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0 && mode !== 'search') setMode('search');
    if (e.target.value.length === 0 && mode === 'search') setMode('camera');
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
                  {/* Text Search Input (only in camera/search mode) */}
                  {(mode === 'camera' || mode === 'search') && (
                    <input
                      type="text"
                      placeholder="Search everything at Walmart online and in store"
                      className="neon-search-input"
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                    />
                  )}
                  {/* Image Upload Area (only in image mode) */}
                  {mode === 'image' && (
                    <div
                      className={`image-search-area w-full min-h-[40px] flex items-center bg-transparent pl-10`}
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
                  {/* Right toggle/upload/send button */}
                  <button
                    type={mode === 'search' && searchTerm.length > 0 ? 'submit' : 'button'}
                    className="neon-search-toggle-btn neon-search-toggle-btn-right"
                    onClick={handleRightButtonClick}
                    aria-label={
                      mode === 'camera' ? 'Switch to image search' :
                      mode === 'image' ? 'Switch to text search' :
                      'Submit search'
                    }
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600">
                      {mode === 'camera' ? (
                        <Camera className="w-5 h-5 text-white" />
                      ) : mode === 'image' ? (
                        <Search className="w-5 h-5 text-white" />
                      ) : (
                        <ArrowUp className="w-5 h-5 text-white" />
                      )}
                    </span>
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