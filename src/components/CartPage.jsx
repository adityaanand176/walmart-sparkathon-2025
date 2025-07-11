import React from 'react';
import { useCart } from './CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
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
                  <td className="py-2">{item.product_name}</td>
                  <td className="py-2">${item.final_price}</td>
                  <td className="py-2">{item.quantity}</td>
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