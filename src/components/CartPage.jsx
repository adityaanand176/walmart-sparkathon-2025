import React from 'react';
import { useCart } from './CartContext';

const getProductImage = (product) => {
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
};

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.final_price || 0) * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-lg">Your cart is empty.</div>
      ) : (
        <>
          <table className="w-full mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Image</th>
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Quantity</th>
                <th className="text-left py-2">Total</th>
                <th></th>
              </tr>
            </thead>
            
            <tbody>
              {cart.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">
                    <img src={getProductImage(item)} alt={item.product_name} className="h-16 w-16 object-contain rounded" />
                  </td>
                  <td className="py-2">{item.product_name}</td>
                  <td className="py-2">${Number(item.final_price).toFixed(2)}</td>
                  <td className="py-2">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2">${(item.final_price * item.quantity).toFixed(2)}</td>
                  <td className="py-2">
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Cart</button>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage; 