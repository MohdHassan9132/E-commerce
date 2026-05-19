import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Auth context
import { useCart } from "../../context/CartContext"; // Custom cart hook
import { RefreshCcw, ShoppingCart } from "lucide-react";
import { Query } from "appwrite";
import { databases, ORDERS_COLLECTION_ID, DATABASE_ID, storage, BUCKET_ID } from "../../appwriteConfig";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          ORDERS_COLLECTION_ID,
          [Query.equal("userId", user.$id)]
        );
        setOrders(response.documents);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  // Tab filtering logic remains unchanged
  const filteredOrders = orders.filter((order) => {
    switch (activeTab) {
      case "Buy Again":
        return order.deliverystatus === "Delivered";
      case "Not Yet Shipped":
        return order.deliverystatus === "Not yet shipped";
      case "Cancelled Orders":
        return order.deliverystatus === "Cancelled";
      default:
        return true;
    }
  });

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading orders...</p>;
  }

  const tabs = ["Orders", "Buy Again", "Not Yet Shipped", "Cancelled Orders"];

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search orders..."
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
              Search Orders
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-300 mb-4 flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Count & Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          <strong>{filteredOrders.length} orders</strong> placed in{" "}
          <span className="text-gray-500">past 3 months</span>
        </div>
        <div>
          <select className="border border-gray-300 text-sm rounded px-2 py-1">
            <option>past 3 months</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          filteredOrders.map((order) => {
            // Parse the productIds field (supports JSON array or newline-separated strings)
            let products = [];
            if (Array.isArray(order.productIds)) {
              products = order.productIds;
            } else if (typeof order.productIds === "string") {
              const trimmed = order.productIds.trim();
              if (trimmed.startsWith("[")) {
                try {
                  products = JSON.parse(trimmed);
                } catch (error) {
                  console.error("Error parsing productIds as JSON array:", error);
                }
              } else {
                const lines = trimmed.split("\n").filter((line) => line.trim() !== "");
                products = lines
                  .map((line) => {
                    try {
                      return JSON.parse(line);
                    } catch (e) {
                      console.error("Error parsing product line:", line, e);
                      return null;
                    }
                  })
                  .filter((item) => item !== null);
              }
            }
            // Convert stringified products to objects if needed
            products = products.map((prod) =>
              typeof prod === "string" ? JSON.parse(prod) : prod
            );

            // Map order fields with fallbacks
            const orderId = order.$id || order.id || "N/A";
            const orderDate = order.orderDate
              ? new Date(order.orderDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "N/A";
            const orderAmount = order.orderAmount || 0;
            const shipTo = order.shipTo || order.address || "N/A";
            const deliveryDate = order.deliverydate
              ? new Date(order.deliverydate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "N/A";
            const deliveryNote = order.deliverynote || "";
            const deliveryStatus = order.deliverystatus || "Not yet shipped";

            return (
              <div key={orderId} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                {/* Order Header */}
                <div className="p-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">ORDER PLACED <br /></span>
                      {orderDate}
                    </div>
                    <div>
                      <span className="font-semibold">TOTAL</span> <br /> ₹{parseFloat(orderAmount).toFixed(2)}
                    </div>
                    <div>
                      <span className="font-semibold">Ship to</span> <br />
                      <span className="text-blue-600">{shipTo}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-sm text-gray-700 space-y-1">
                    <div>
                      <span className="font-semibold">Order #</span> {orderId}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:underline">View order details</button>
                      <button className="text-blue-600 hover:underline">Invoice</button>
                    </div>
                  </div>
                </div>

                {/* Delivery Status & Date */}
<div className="px-4 pt-3 text-sm text-left">
  <strong className="text-yellow-600">
    {deliveryStatus}
  </strong>
  <br />
  <strong className="text-green-700">
    {deliveryStatus === "Delivered" ? `Delivered on ${deliveryDate}` : `Action Date: ${deliveryDate}`}
  </strong>
  {deliveryStatus === "Delivered" && deliveryNote && (
    <span className="text-gray-600"><br />{deliveryNote}</span>
  )}
</div>

                {/* Products List in Order */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  <div className="flex flex-col space-y-4 md:col-span-2">
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          {product.image ? (
                            <img 
                              src={storage.getFileView(BUCKET_ID, product.image).toString()}
                              alt={product.name}
                              className="w-32 h-40 object-cover rounded-lg shadow-md"
                            />
                          ) : (
                            <div className="w-32 h-40 flex items-center justify-center bg-gray-200 rounded-lg shadow-md">
                              <span className="text-gray-500">No Image</span>
                            </div>
                          )}
                          <div className="text-blue-600 font-medium truncate w-full">
                            <p className="text-blue-600 hover:underline font-medium">
                              {product.name || ""}
                            </p>
                            {/* "Buy it again" button using addToCart */}
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  addToCart({
                                    ...product,
                                    // Ensure imageUrl is provided for the cart display
                                    imageUrl: product.image
                                      ? storage.getFileView(BUCKET_ID, product.image)
                                      : null,
                                  })
                                }
                                className="bg-yellow-500 hover:bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                              >
                                <RefreshCcw className="w-4 h-4" />
                                <ShoppingCart className="w-4 h-4" />
                                <span>Buy it again</span>
                              </button>
                              <button className="border border-gray-300 hover:bg-gray-50 text-gray-800 px-3 py-1 rounded-full text-sm">
                                View your item
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No products available.</p>
                    )}
                  </div>

                  {/* Right Column: Other Action Buttons */}
                  <div className="flex flex-col items-end space-y-2 md:col-span-2 md:justify-self-end w-full">
                    <button className="border border-gray-300 hover:bg-gray-50 px-4 py-1 rounded-full text-sm w-64 font-semibold">
                      Track package
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 px-4 py-1 rounded-full text-sm w-64 font-semibold">
                      Return or replace items
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 px-4 py-1 rounded-full text-sm w-64 font-semibold">
                      Leave delivery feedback
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 px-4 py-1 rounded-full text-sm w-64 font-semibold">
                      Leave seller feedback
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 px-4 py-1 rounded-full text-sm w-64 font-semibold">
                      Write a product review
                    </button>
                  </div>
                </div>

                {/* Archive Order Button */}
                <div className="p-4 border-t border-gray-200 flex justify-start">
                  <button className="text-sm text-blue-600 hover:underline">
                    Archive order
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
