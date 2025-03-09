import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  DATABASE_ID, 
  USERS_COLLECTION_ID, 
  ORDERS_COLLECTION_ID, 
  account, 
  databases, 
  storage, 
  BUCKET_ID,
  ID 
} from "../../appwriteConfig"; 
import { useCart } from "../../context/CartContext"; 
import toast from "react-hot-toast";

// Ensure you have loaded Razorpay's checkout.js script in your index.html
// and that window.Razorpay is available.

const Checkout = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [guestDetails, setGuestDetails] = useState({ name: "", email: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const { cart, getTotalAmount, clearCart } = useCart();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await account.get();
        const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id);
        setUserDetails(userDoc);
      } catch (error) {
        console.log("User not logged in. Proceeding with guest checkout.");
      }
    };
    fetchUserDetails();
  }, []);

  const handleGuestInputChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Razorpay Payment Handler
  const handlePayment = async () => {
    const amount = getTotalAmount() * 100; // Convert to paisa
    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_Cq8qlQkfIGgJTg", // Replace with your actual Razorpay Test Key
        amount: amount,
        currency: "INR",
        name: "My E-Commerce",
        description: "Order Payment",
        handler: function (response) {
          resolve(response.razorpay_payment_id);
        },
        prefill: {
          name: userDetails ? userDetails.name : guestDetails.name,
          email: userDetails ? userDetails.email : guestDetails.email,
          contact: userDetails ? userDetails.phone : guestDetails.phone,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      razorpay.on("payment.failed", function (response) {
        reject(response.error);
      });
    });
  };

  const handleCheckout = async () => {
    // Validate required fields for guest checkout
    if (!userDetails && (!guestDetails.name || !guestDetails.email || !guestDetails.phone || !guestDetails.address)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Calculate product IDs based on quantity (repeating the id)
      const productIds = cart.flatMap(item => Array(item.quantity).fill(item.id));

      let paymentId = "";
      if (paymentMethod === "Online") {
        paymentId = await handlePayment();
      }

      // Create orderData according to your schema
      const orderData = {
        userId: userDetails ? userDetails.$id : "Guest",
        name: userDetails ? userDetails.name : guestDetails.name,
        email: userDetails ? userDetails.email : guestDetails.email,
        phone: userDetails ? userDetails.phone : guestDetails.phone,
        address: userDetails ? userDetails.address : guestDetails.address,
        paymentMode: paymentMethod,
        orderDate: new Date().toISOString(),
        orderAmount: getTotalAmount(),
        orderStatus: paymentMethod === "Online" ? "Paid" : "Pending",
        paymentId: paymentId,
        productIds: productIds,
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      <div className="bg-white p-4 shadow-md rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">{userDetails ? "Shipping Details" : "Guest Checkout"}</h2>
        {userDetails ? (
          <>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <label className="block mt-2 mb-1">Address:</label>
            <input
              type="text"
              value={userDetails.address}
              onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </>
        ) : (
          <>
            <input type="text" name="name" placeholder="Name" value={guestDetails.name} onChange={handleGuestInputChange} className="w-full p-2 border rounded mb-2" />
            <input type="email" name="email" placeholder="Email" value={guestDetails.email} onChange={handleGuestInputChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="phone" placeholder="Phone" value={guestDetails.phone} onChange={handleGuestInputChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="address" placeholder="Address" value={guestDetails.address} onChange={handleGuestInputChange} className="w-full p-2 border rounded mb-2" />
          </>
        )}
      </div>

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
