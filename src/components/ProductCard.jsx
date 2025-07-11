import React from 'react'
import { useNavigate } from 'react-router-dom';


function ProductCard({product}) {
  const navigate = useNavigate();

  function getProductImage(product) {
    if (product.main_image && product.main_image.startsWith('http')) return product.main_image;
    if (product.image_urls) {
      try {
        const arr = JSON.parse(product.image_urls.replace(/''/g, '"'));
        if (Array.isArray(arr) && arr.length && arr[0].startsWith('http')) return arr[0];
      } catch {
        const arr = product.image_urls.split(',').map(s => s.replace(/\[|\]|"/g, '').trim()).filter(Boolean);
        if (arr.length && arr[0].startsWith('http')) return arr[0];
      }
    }
    return 'https://via.placeholder.com/200x200?text=No+Image';
  }
  
  return (
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
            <span className="text-lg font-bold">${Number(product.final_price).toFixed(2) || 'N/A'}</span>
            {/* Add original price/discount if available */}
            </div>
            <p className="text-xs text-gray-500 mb-2">{product.description?.slice(0, 60) || 'No description'}...</p>
            <div className="text-xs text-gray-600 mb-1">Brand: {product.brand || 'N/A'}</div>
            <div className="text-xs text-gray-600 mb-1">Category: {product.category_name || 'N/A'}</div>
        </div>
        <button className="bg-blue-600 text-white rounded px-4 py-2 mt-2 font-semibold hover:bg-blue-700">Options</button>
        <div className="flex items-center mt-2">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm font-medium">{product.rating || product.rating_stars || 'N/A'}</span>
            <span className="text-xs text-gray-400 ml-2">({product.review_count || 0})</span>
        </div>
        </div>
    </div>
  )
}

export default ProductCard

