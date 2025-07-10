import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';

const BACKEND_URL = 'http://localhost:4000';

function parseImages(product) {
  if (product.main_image && product.main_image.startsWith('http')) return [product.main_image];
  if (product.image_urls) {
    try {
      const arr = JSON.parse(product.image_urls.replace(/''/g, '"'));
      if (Array.isArray(arr) && arr.length) return arr;
    } catch {
      const arr = product.image_urls.split(',').map(s => s.replace(/\[|\]|"/g, '').trim()).filter(Boolean);
      if (arr.length) return arr;
    }
  }
  return ['https://via.placeholder.com/200x200?text=No+Image'];
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/product/${encodeURIComponent(id)}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(found => {
        setProduct(found);
        setMainImage(parseImages(found)[0]);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center text-xl">Loading...</div>;
  if (!product) return <div className="p-8 text-center text-xl">Product not found.</div>;

  const images = parseImages(product);

  return (
    <>
      
      <div className="flex bg-gray-50 min-h-screen">
        {/* Left: Images */}
        <aside className="w-28 p-6 flex flex-col items-center space-y-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={product.product_name || 'Product'}
              className={`w-16 h-16 object-contain border rounded cursor-pointer ${mainImage === img ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </aside>
        {/* Center: Main image and details */}
        <main className="flex-1 flex p-8">
          <div className="flex-1 flex flex-col items-center">
            <img src={mainImage} alt={product.product_name || 'Product'} className="h-96 object-contain mb-4" />
          </div>
          {/* Product Info */}
          <div className="flex-1 max-w-xl px-8">
            <h1 className="text-2xl font-bold mb-2">{product.product_name || 'No Title'}</h1>
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="font-semibold mr-2">{product.rating || product.rating_stars || 'N/A'}</span>
              <span className="text-blue-600 underline cursor-pointer text-sm">{product.review_count || 0} ratings</span>
            </div>
            <div className="mb-4">
              <span className="text-2xl font-bold">${product.final_price || 'N/A'}</span>
              {/* Add original price/discount if available */}
            </div>
            <div className="mb-4">
              <h2 className="font-semibold mb-1">About this item</h2>
              <ul className="list-disc ml-6 text-gray-700 text-sm">
                <li>{product.product_name || 'No Title'}</li>
                <li>{product.description || 'No description available.'}</li>
                <li>Brand: {product.brand || 'N/A'}</li>
                <li>Category: {product.category_name || 'N/A'}</li>
                <li>Stock: {product.stock || 'N/A'}</li>
                <li>SKU: {product.sku || 'N/A'}</li>
                <li>Warranty: {product.warrantyInformation || 'N/A'}</li>
                <li>Shipping: {product.shippingInformation || 'N/A'}</li>
              </ul>
            </div>
            <div className="mb-4">
              <a href="#" className="text-blue-600 underline text-sm">View full item details</a>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-100 rounded p-2 text-center">
                <div className="text-xs text-gray-500">Brand</div>
                <div className="font-semibold">{product.brand || 'N/A'}</div>
              </div>
              <div className="bg-gray-100 rounded p-2 text-center">
                <div className="text-xs text-gray-500">Category</div>
                <div className="font-semibold">{product.category_name || 'N/A'}</div>
              </div>
              <div className="bg-gray-100 rounded p-2 text-center">
                <div className="text-xs text-gray-500">SKU</div>
                <div className="font-semibold">{product.sku || 'N/A'}</div>
              </div>
              <div className="bg-gray-100 rounded p-2 text-center">
                <div className="text-xs text-gray-500">Stock</div>
                <div className="font-semibold">{product.stock || 'N/A'}</div>
              </div>
            </div>
          </div>
          {/* Sidebar: Add to cart and delivery */}
          <aside className="w-80 bg-white rounded-lg shadow p-6 flex flex-col ml-8">
            <div className="mb-4">
              <span className="text-2xl font-bold">${product.final_price || 'N/A'}</span>
              <div className="text-xs text-gray-500">Price when purchased online</div>
            </div>
            <button className="bg-blue-600 text-white rounded px-4 py-3 font-semibold mb-4 hover:bg-blue-700">Add to cart</button>
            <div className="mb-4">
              <div className="bg-blue-50 p-2 rounded text-xs text-blue-700 mb-2">Pro Wall Hanging Service<br /><span className="text-gray-500">Accessory Wall Mounting - $65.00</span></div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-1">How you'll get this item:</div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-sm">I want shipping & delivery savings with Walmart+</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 rounded px-2 py-1 text-xs">Shipping</div>
                  <span className="text-xs text-gray-500">Arrives tomorrow</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 rounded px-2 py-1 text-xs">Pickup</div>
                  <span className="text-xs text-gray-500">As soon as 5pm today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 rounded px-2 py-1 text-xs">Delivery</div>
                  <span className="text-xs text-gray-500">As soon as 1 hour</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Arrives by Tomorrow</div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default ProductPage; 