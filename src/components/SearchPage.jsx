import React, { useEffect, useState } from 'react';
import dummyData from '../../dummydaata.json';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const navigate = useNavigate();

  useEffect(() => {
    // Filter products by search term in title or description
    const filtered = dummyData.products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filtered);
  }, [searchTerm]);

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
        <h2 className="text-xl font-bold mb-2">Results for "<span className="text-blue-600">{searchTerm}</span>" ({products.length})</h2>
        <p className="text-gray-500 text-sm mb-6">Uses item details. Price when purchased online</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative">
                <img src={product.thumbnail || product.images[0]} alt={product.title} className="h-48 w-full object-contain mb-2" />
                {/* Example badge */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Deal</span>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">♡</button>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {product.discountPercentage && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold">Rollback</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-base mb-1">{product.title}</h3>
                  <div className="flex items-end space-x-2 mb-1">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.discountPercentage && (
                      <span className="text-sm line-through text-gray-400">${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{product.description.slice(0, 60)}...</p>
                </div>
                <button className="bg-blue-600 text-white rounded px-4 py-2 mt-2 font-semibold hover:bg-blue-700">Options</button>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-400 ml-2">({product.reviews?.length || 0})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPage; 