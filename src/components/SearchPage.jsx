import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useCart } from './CartContext';
=======
import ProductCard from './ProductCard';
>>>>>>> 10844019f184a25d3776545bf157b8641e14732c

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BACKEND_URL = 'http://localhost:4000';


const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // Show 8 per page for grid
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/search?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.results);
        setTotal(data.total);
        setLoading(false);
      });
  }, [searchTerm, page, limit]);

  const totalPages = Math.ceil(total / limit);

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
          <li>Item Condition</li>
          <li>Cellphone Type</li>
          <li>Service Plan Type</li>
          <li>Internal Memory</li>
          <li>Color</li>
        </ul>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-2">Results for "<span className="text-blue-600">{searchTerm}</span>" ({total})</h2>
        <p className="text-gray-500 text-sm mb-6">Uses item details. Price when purchased online</p>
        {loading ? (
          <div className="text-center py-12 text-lg">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
<<<<<<< HEAD
                <div
                  key={product.product_id || product.sku || product.product_name}
                  className="bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/product/${product.product_id || product.sku || product.product_name}`)}
                >
                  <div className="relative">
                    <img src={getProductImage(product)} alt={product.product_name || 'Product'} className="h-48 w-full object-contain mb-2" />
                    {/* Example badge */}
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Deal</span>
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">♡</button>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {/* You can add discount/rollback logic here if available */}
                      </div>
                      <h3 className="font-semibold text-base mb-1">{product.product_name || 'No Title'}</h3>
                      <div className="flex items-end space-x-2 mb-1">
                        <span className="text-lg font-bold">${product.final_price || 'N/A'}</span>
                        {/* Add original price/discount if available */}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{product.description?.slice(0, 60) || 'No description'}...</p>
                      <div className="text-xs text-gray-600 mb-1">Brand: {product.brand || 'N/A'}</div>
                      <div className="text-xs text-gray-600 mb-1">Category: {product.category_name || 'N/A'}</div>
                    </div>
                    <button
                      className="bg-blue-600 text-white rounded px-4 py-2 mt-2 font-semibold hover:bg-blue-700"
                      onClick={e => {
                        e.stopPropagation();
                        addToCart({
                          id: product.product_id || product.sku || product.product_name,
                          product_name: product.product_name,
                          final_price: product.final_price,
                          ...product
                        });
                      }}
                    >
                      Add to cart
                    </button>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-sm font-medium">{product.rating || product.rating_stars || 'N/A'}</span>
                      <span className="text-xs text-gray-400 ml-2">({product.review_count || 0})</span>
                    </div>
                  </div>
                </div>
=======
                <ProductCard key={product.id} product={product}/>
>>>>>>> 10844019f184a25d3776545bf157b8641e14732c
              ))}
            </div>
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