import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  DATABASE_ID, 
  USERS_COLLECTION_ID, 
  ORDERS_COLLECTION_ID, 
  account, 
  databases, 
  ID 
} from "../../appwriteConfig"; 
import { useCart } from "../../context/CartContext"; 
import toast from "react-hot-toast";

const Checkout = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", address: "" });
  const navigate = useNavigate();
  const { cart, getTotalAmount, clearCart } = useCart();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await account.get();
        const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id);
        setUserDetails(userDoc);
      } catch (error) {
        toast.error("You must be logged in to place an order.");
        navigate("/login");
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const handleRazorpayPayment = async () => {
    const amount = getTotalAmount() * 100;
    const options = {
      key: "rzp_test_Cq8qlQkfIGgJTg", 
      amount: amount,
      currency: "INR",
      name: "Albaan Foods",
      description: "Purchase Order",
      handler: async function (response) {
        await placeOrder("Online", "Paid");
      },
      prefill: {
        name: userDetails?.name,
        email: userDetails?.email,
        contact: userDetails?.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const placeOrder = async (paymentMode, orderStatus) => {
    try {
      const productIds = cart.map(item =>
        JSON.stringify({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "",
        })
      );

      const orderData = {
        userId: userDetails.$id,
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
        paymentMode,
        orderDate: new Date().toISOString(),
        orderAmount: getTotalAmount(),
        orderStatus,
        productIds,
      };

      await databases.createDocument(DATABASE_ID, ORDERS_COLLECTION_ID, ID.unique(), orderData);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Order placement failed", error);
      toast.error("Order placement failed. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleCheckout = async () => {
    let validationErrors = {};
    if (!userDetails?.name) validationErrors.name = "Name is required.";
    if (!userDetails?.email) validationErrors.email = "Email is required.";
    if (!userDetails?.phone) validationErrors.phone = "Phone number is required.";
    if (!userDetails?.address) validationErrors.address = "Address is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsPlacingOrder(true);
    if (paymentMethod === "Online") {
      handleRazorpayPayment();
    } else {
      placeOrder("COD", "Pending");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {userDetails && (
        <div className="bg-white p-4 shadow-md rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
          <label className="block mt-2 mb-1">Name:</label>
          <input
            type="text"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label className="block mt-2 mb-1">Email:</label>
          <input
            type="email"
            value={userDetails.email}
            className="w-full p-2 border rounded"
            disabled
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <label className="block mt-2 mb-1">Phone:</label>
          <input
            type="text"
            value={userDetails.phone}
            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <label className="block mt-2 mb-1">Address:</label>
          <input
            type="text"
            value={userDetails.address}
            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
      )}

      <div className="bg-white p-4 shadow-md rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Online">Online Payment</option>
        </select>
      </div>

      <button onClick={handleCheckout} disabled={isPlacingOrder} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        {isPlacingOrder ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
