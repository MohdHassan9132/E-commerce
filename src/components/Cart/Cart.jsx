import { useContext } from "react";
import images from "../../data/images";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  // Calculate total price & item count
  const totalPrice = cart.reduce((total, item) => {
    const numericPrice = Number(item.price.replace(/\D/g, "")); // Extract only numbers
    const quantity = item.quantity || 1; // Default to 1 if undefined
    return total + numericPrice * quantity;
  }, 0);

  const totalItems = cart.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-md shadow-md"
              >
                <img
                  src={images[item.image]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.price}</p>
                  <p className="text-gray-500">
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Proceed to Buy Section */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow-md text-center max-w-md mx-auto">
            <h2 className="text-lg font-semibold">
              Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):
              <span className="font-bold text-xl">
                {" "}
                ₹{totalPrice.toLocaleString("en-IN")}.00
              </span>
            </h2>
            <Link to="/checkout">
              <button className="mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition">
                Proceed to Buy
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
