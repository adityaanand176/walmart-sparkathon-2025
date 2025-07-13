import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useCart } from './CartContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BACKEND_URL = 'http://localhost:4000';


const SearchPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // Show 8 per page for grid
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const { addToCart } = useCart();

  useEffect(() => {
    // dont initialize if empty search
    if (!searchTerm) {
        setAllProducts([]);
        setTotal(0);
        return;
    }

    const fetchData = async ()=>{

      setLoading(true);
      setPage(1)
      try {
        const res = await axios.post(`${BACKEND_URL}/api/embed?q=${encodeURIComponent(searchTerm)}`);
        const data = res.data;
        setAllProducts(data.results);
        setTotal(data.total);
      }
      catch (err){
        console.error("Fetch error: ", err);
        setAllProducts([]);
        setTotal(0);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

   useEffect(() => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      // Slice the full list of products to get the items for the current page
      setDisplayedProducts(allProducts.slice(startIndex, endIndex));
  
    }, [page, allProducts, limit]);
  

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
        {loading ? (
          <div className="text-center py-12 text-lg">Loading...</div>
        ) : (
          <>
          <h2 className="text-xl font-bold mb-2">Results for "<span className="text-blue-600">{searchTerm}</span>" ({total})</h2>
          <p className="text-gray-500 text-sm mb-6">Uses item details. Price when purchased online</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map(product => (
                <ProductCard key={product.product_id} product={product}/>
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