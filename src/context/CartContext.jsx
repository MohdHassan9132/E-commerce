import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
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

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.$id !== productId));
  };

  // Reduce quantity
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
  // Total Amount
  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  // Clear cart and remove from localStorage
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, reduceQuantity, clearCart,getTotalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
