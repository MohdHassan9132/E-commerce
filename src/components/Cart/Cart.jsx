// Cart.js
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, reduceQuantity,getTotalAmount } = useContext(CartContext);

  const totalAmount = getTotalAmount();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cart.map((item) => (
              <li
                key={item.$id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex items-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded mr-4">
                      No Image
                    </div>
                  )}
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      Price: ₹{item.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {item.quantity > 1 && (
                    <button
                      onClick={() => reduceQuantity(item.$id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Reduce
                    </button>
                  )}
                  <button
                    onClick={() => removeFromCart(item.$id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Total: ₹{totalAmount.toFixed(2)}
            </h2>
            <Link
              to="/checkout"
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Proceed to Buy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
