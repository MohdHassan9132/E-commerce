import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart: If product exists, increase quantity; otherwise, add new item.
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.$id === product.$id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.$id === product.$id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove the whole item regardless of quantity.
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.$id !== productId));
  };

  // Reduce the quantity by 1 if above 1. If quantity would drop below 1, remove the item.
  const reduceQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.$id === productId) {
            const newQuantity = (item.quantity || 1) - 1;
            return newQuantity >= 1 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // ✅ Clear the entire cart (Fix for "clearCart is not a function" issue)
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total cart amount
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, reduceQuantity, getTotalAmount, clearCart }} // ✅ Added clearCart
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Export `useCart` for usage in components
export const useCart = () => {
  return useContext(CartContext);
};
