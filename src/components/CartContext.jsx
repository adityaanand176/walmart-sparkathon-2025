import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // If item exists, increase quantity
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return initialState;
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };
  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  return (
    <CartContext.Provider value={{ cart: state.items, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 