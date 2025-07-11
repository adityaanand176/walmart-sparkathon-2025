import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

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
                <ProductCard key={product.id} product={product}/>
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