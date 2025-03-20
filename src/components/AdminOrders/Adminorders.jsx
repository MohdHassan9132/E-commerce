import React, { useState, useEffect } from "react";
import { databases, DATABASE_ID, ORDERS_COLLECTION_ID, storage, BUCKET_ID } from "../../appwriteConfig";
import { Query } from "appwrite";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, ORDERS_COLLECTION_ID);
        setOrders(response.documents);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrder = async (orderId, updatedData) => {
    try {
      await databases.updateDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId, updatedData);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.$id === orderId ? { ...order, ...updatedData } : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading orders...</p>;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            // Parse products similar to user orders page
            let products = [];
            if (Array.isArray(order.productIds)) {
              products = order.productIds;
            } else if (typeof order.productIds === "string") {
              const trimmed = order.productIds.trim();
              if (trimmed.startsWith("[")) {
                try {
                  products = JSON.parse(trimmed);
                } catch (error) {
                  console.error("Error parsing productIds:", error);
                }
              } else {
                const lines = trimmed.split("\n").filter(line => line.trim() !== "");
                products = lines.map(line => {
                  try {
                    return JSON.parse(line);
                  } catch (e) {
                    console.error("Error parsing product line:", e);
                    return null;
                  }
                }).filter(item => item !== null);
              }
            }
            products = products.map(prod => typeof prod === "string" ? JSON.parse(prod) : prod);

            // Order details
            const orderDate = new Date(order.orderDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric"
            });
            const orderAmount = order.orderAmount || 0;
            const shipTo = order.name || order.address || "N/A";

            return (
              <div key={order.$id} className="bg-white shadow-md rounded-lg border border-gray-200 p-4">
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">Order #{order.$id}</p>
                    <p className="text-sm"><span className="font-medium">Placed:</span> {orderDate}</p>
                    <p className="text-sm"><span className="font-medium">Total:</span> ₹{orderAmount.toFixed(2)}</p>
                    <p className="text-sm"><span className="font-medium">Ship to:</span> {shipTo}</p>
                  </div>

                  <div className="space-y-2 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Status:</label>
                      <select
                        className="border border-gray-300 rounded px-2 py-1"
                        value={order.deliverystatus || "Not yet shipped"}
                        onChange={(e) => updateOrder(order.$id, { deliverystatus: e.target.value })}
                      >
                        <option value="Not yet shipped">Not yet shipped</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Delivery Date:</label>
                      <input
                        type="date"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={order.deliverydate ? new Date(order.deliverydate).toISOString().split("T")[0] : ""}
                        onChange={(e) => updateOrder(order.$id, { deliverydate: new Date(e.target.value).toISOString() })}
                      />
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-medium mb-2">Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product, index) => (
                      <div key={index} className="flex items-start gap-4">
                        {product.image && (
                          <img
                            src={storage.getFilePreview(BUCKET_ID, product.image)}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="font-medium">{product.name || "Unnamed Product"}</p>
                          <p className="text-sm text-gray-600">Quantity: {product.quantity || 1}</p>
                          <p className="text-sm text-gray-600">Price: ₹{product.price?.toFixed(2) || "0.00"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Order Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><span className="font-medium">Payment Method:</span> {order.paymentMode}</p>
                      <p><span className="font-medium">Payment Status:</span> {order.paymentstatus}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Contact Email:</span> {order.email}</p>
                      <p><span className="font-medium">Contact Phone:</span> {order.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;