import React, { useState } from "react";
import badamshake from "../../assets/images/badamshake.jpg";
import kheer from "../../assets/images/kheer.jpeg";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const mockOrders = [
    {
      id: "407-7359265-7741113",
      orderDate: "2025-02-04",
      orderAmount: 1800.0,
      orderStatus: "Delivered",
      deliveryDate: "2025-02-07",
      deliveryNote: "Package was handed to resident",
      shipTo: "sadiq",
      products: [
        {
          id: "p1",
          name: "Isha Vasyam A2 Ghee Desi Gir Cow's Vedic Traditional Grassfed Ghee, 500ml",
          price: 1800.0,
          imageUrl: badamshake,
        },
      ],
    },
    {
      id: "407-3297268-9750751",
      orderDate: "2025-02-04",
      orderAmount: 1419.0,
      orderStatus: "Delivered",
      deliveryDate: "2025-02-06",
      deliveryNote: "Package was handed to resident",
      shipTo: "sadiq",
      products: [
        {
          id: "p2",
          name: "NATURALTEIN Crea Boost Creatine Monohydrate, 100% Pure (250G), Powder",
          price: 1419.0,
          imageUrl: kheer,
        },
      ],
    },
  ];

  const tabs = ["Orders", "Buy Again", "Not Yet Shipped", "Cancelled Orders"];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
      </div>

      {/* Tabs */}
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

      {/* Orders */}
      <div className="space-y-4">
  {mockOrders.map((order) => (
    <div key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      
      {/* Order Header */}
      <div className="bg-gray-100 p-4 border-b border-gray-300 flex flex-wrap gap-4 items-center">
        <div className="text-gray-500 text-base">
          <span className="font-medium text-black">ORDER PLACED:</span> {new Date(order.orderDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className="text-gray-500 text-base">
          <span className="font-medium text-black">TOTAL:</span> ₹{order.orderAmount.toFixed(2)}
        </div>
        <div className="text-gray-500 text-base">
          <span className="font-medium text-black">SHIP TO:</span> <span className="font-medium text-blue-600">{order.shipTo}</span>
        </div>
      </div>

      {/* Order Content */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
        
        {/* Product Image */}
        <img
          src={order.products[0].imageUrl}
          alt={order.products[0].name}
          className="w-24 h-24 object-cover rounded-lg"
        />

        {/* Order Details */}
        <div className="col-span-2">
          <div className="text-sm font-semibold text-green-600">
            {order.orderStatus} on {new Date(order.deliveryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
          </div>
          <div className="text-gray-600 text-xs mt-1">
            {order.deliveryNote}
          </div>
        </div>

        {/* Actions (Aligned to Right) */}
        <div className="flex flex-col space-y-1 items-end">
          <button className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-md text-xs">Track Package</button>
          {order.id === "407-7359265-7741113" && (
            <button className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-md text-xs">Return or Replace</button>
          )}
          <button className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-md text-xs">Leave Feedback</button>
          <button className="border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded-md text-xs">Write a Review</button>
        </div>
      </div>

      {/* Archive Order Button (Moved to Left) */}
      <div className="p-2 border-t border-gray-200 flex justify-start">
        <button className="border border-red-500 text-red-500 hover:bg-red-100 px-3 py-1 rounded-md text-xs">Archive Order</button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Orders;
