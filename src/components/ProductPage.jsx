import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useCart } from './CartContext';
import Papa from 'papaparse';

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
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    // Only fetch reviews if product is loaded
    if (!product) return;
    fetch('/walmart-products.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Find the row for this product
            const row = results.data.find(row => row.product_id === String(product.product_id));
            let parsedReviews = [];
            if (row && row.customer_reviews) {
              try {
                parsedReviews = JSON.parse(row.customer_reviews);
              } catch {}
            }
            if ((!parsedReviews || parsedReviews.length === 0) && row && row.top_reviews) {
              try {
                parsedReviews = JSON.parse(row.top_reviews);
              } catch {}
            }
            setReviews(parsedReviews || []);
          }
        });
      });
  }, [product]);

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
              <span className="text-2xl font-bold">${Number(product.final_price).toFixed(2) || 'N/A'}</span>
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
              <span className="text-2xl font-bold">${Number(product.final_price).toFixed(2) || 'N/A'}</span>
              <div className="text-xs text-gray-500">Price when purchased online</div>
            </div>
            <button
              className={added ? "bg-green-600 text-white rounded px-4 py-3 font-semibold mb-4 hover:bg-green-700" : "bg-blue-600 text-white rounded px-4 py-3 font-semibold mb-4 hover:bg-blue-700"}
              onClick={() => {
                if (!added) {
                  addToCart({
                    id: product.product_id || product.sku || product.product_name,
                    product_name: product.product_name,
                    final_price: Number(product.final_price).toFixed(2),
                    ...product
                  });
                  setAdded(true);
                } else {
                  navigate('/cart');
                }
              }}
            >
              {added ? 'Go to Cart' : 'Add to cart'}
            </button>
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
     {/* Reviews Section */}
     <div className="max-w-3xl mx-auto mt-8 bg-white rounded shadow p-6">
       <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
       {reviews && reviews.length > 0 ? (
         <ul className="space-y-4">
           {reviews.map((review, idx) => (
             <li key={idx} className="border-b pb-4">
               <div className="flex items-center mb-1">
                 <span className="text-yellow-400 mr-2">{'★'.repeat(review.rating || 0)}</span>
                 <span className="font-semibold">{review.title || ''}</span>
               </div>
               <div className="text-gray-700 mb-1">{review.review}</div>
               <div className="text-xs text-gray-500">{review.name || 'Anonymous'}</div>
             </li>
           ))}
         </ul>
       ) : (
         <div className="text-gray-500">No reviews available for this product.</div>
       )}
     </div>
    </>
  );
};

export default ProductPage; 