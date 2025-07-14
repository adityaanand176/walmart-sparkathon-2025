import React, { createContext, useContext, useState } from 'react';

const ImageSearchContext = createContext();

export function ImageSearchProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <ImageSearchContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageSearchContext.Provider>
  );
}

export function useImageSearch() {
  return useContext(ImageSearchContext);
} 