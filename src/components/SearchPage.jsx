import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductGridSkeleton from './ProductGridSkeleton';
import axios from 'axios';
import { useCart } from './CartContext';
import { Camera, Upload, X } from 'lucide-react';
import { useImageSearch } from './ImageSearchContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BACKEND_URL = 'http://localhost:4000';

const SearchPage = ({
  searchTerm,
  setSearchTerm,
  searchMode,
  setSearchMode,
  isDragOver,
  setIsDragOver,
  glowActive,
  setGlowActive,
  navigate
}) => {
  const { selectedImage, setSelectedImage } = useImageSearch();
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageSearchResults, setImageSearchResults] = useState(null);
  
  const query = useQuery();
  const urlSearchTerm = query.get('q') || '';
  const isImageSearch = query.get('image') === 'true';
  const { addToCart } = useCart();

  useEffect(() => {
    if (!loading && glowActive) {
      setGlowActive(false);
    }
  }, [loading]);

  useEffect(() => {
    // dont initialize if empty search
    if (!urlSearchTerm && !isImageSearch) {
        setAllProducts([]);
        setTotal(0);
        return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        if (isImageSearch && selectedImage) {
          // Handle image search
          const formData = new FormData();
          formData.append('image', selectedImage.file);
          res = await axios.post(`${BACKEND_URL}/api/image-search`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          // Handle text search
          res = await axios.post(`${BACKEND_URL}/api/embed?q=${encodeURIComponent(urlSearchTerm)}`);
        }
        
        const data = res.data;
        setAllProducts(data.results || []);
        setTotal(data.total || 0);
        if (isImageSearch) {
          setImageSearchResults(data);
        }
      } catch (err) {
        console.error("Fetch error: ", err);
        setAllProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    
    if (urlSearchTerm || (isImageSearch && selectedImage)) {
      setGlowActive(true); // Start glow when search starts
      fetchData();
    }
  }, [urlSearchTerm, isImageSearch, selectedImage]);

  
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / 8);
  useEffect(() => {
    const startIndex = (page - 1) * 8;
    const endIndex = startIndex + 8;
    setDisplayedProducts(allProducts.slice(startIndex, endIndex));
  }, [allProducts, page]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <ul className="space-y-4 text-sm">
          <li>Price</li>
          <li>Brand</li>
          <li>Fulfillment Speed</li>
          <li>Phone Features</li>
          <li>Model Name</li>
          <li>Service Carrier</li>
          <li>Cellphone Type</li>
          <li>Service Plan Type</li>
          <li>Internal Memory</li>
          <li>Color</li>
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        {loading ? (
          <ProductGridSkeleton />
        ) : (
          <>
            {urlSearchTerm && (
              <h2 className="text-xl font-bold mb-2">
                Results for "<span className="text-blue-600">{urlSearchTerm}</span>" ({total})
              </h2>
            )}
            {isImageSearch && imageSearchResults && (
              <h2 className="text-xl font-bold mb-2">
                Image Search Results ({total})
              </h2>
            )}
            <p className="text-gray-500 text-sm mb-6">Uses item details. Price when purchased online</p>
            
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard key={product.product_id} product={product}/>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {isImageSearch 
                    ? 'Upload an image to search for similar products' 
                    : 'No products found. Try adjusting your search terms.'
                  }
                </p>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border'}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SearchPage; 