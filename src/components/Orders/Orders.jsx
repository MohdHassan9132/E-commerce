import React, { useState } from "react";
import badamshake from "../../assets/images/badamshake.jpg";
import kheer from "../../assets/images/kheer.jpeg";
import { RefreshCcw, ShoppingCart } from "lucide-react"
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

      {/* Orders Count & Filter (Mock) */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm">
          <strong>{mockOrders.length} orders</strong> placed in <span className="text-gray-500">past 3 months</span>
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
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            
            {/* Order Header */}
            <div className="p-4 border-b border-gray-300 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              {/* Left: ORDER PLACED, TOTAL, SHIP TO */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">ORDER PLACED <br /></span>{" "}
                  {new Date(order.orderDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div>
                  <span className="font-semibold">TOTAL</span> <br /> ₹{order.orderAmount.toFixed(2)}
                </div>
                <div>
                  <span className="font-semibold">Ship to</span> <br />{" "}
                  <span className="text-blue-600">{order.shipTo}</span>
                </div>
              </div>
              {/* Right: ORDER #, View order details, Invoice */}
              <div className="flex flex-col items-end text-sm text-gray-700 space-y-1">
                <div>
                  <span className="font-semibold">Order #</span> {order.id}
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-blue-600 hover:underline">View order details</button>
                  <button className="text-blue-600 hover:underline">Invoice</button>
                </div>
              </div>
            </div>

            {/* Delivery Date & Handling Statement */}
            <div className="px-4 pt-3 text-sm text-left">
              <strong className="text-green-700">
                Delivered {new Date(order.deliveryDate).toLocaleDateString("en-US", { day: "numeric", month: "long" })}
              </strong>{" "}
              <span className="text-gray-600"> <br />{order.deliveryNote}</span>
            </div>

            {/* Main Content */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              {/* Product Image & Name */}
              <div className="flex items-start space-x-3 md:col-span-2">
                <img 
                  src={order.products[0].imageUrl}
                  alt={order.products[0].name}
                  className="w-32 h-40 object-cover rounded-lg shadow-md"
                />
               <div className="text-blue-600  font-medium truncate w-full">
  <p className="text-blue-600 hover:underline font-medium">
    {order.products[0].name}
  </p>

  {/* Buttons in the same row */}
  <div className="flex space-x-2">
  <button className="bg-yellow-500 hover:bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
    <RefreshCcw className="w-4 h-4" /> {/* Cycle/Refresh Icon */}
    <ShoppingCart className="w-4 h-4" /> {/* Basket Icon */}
    <span>Buy it again</span>
  </button>
  <button className="border border-gray-300 hover:bg-gray-50 text-gray-800 px-3 py-1 rounded-full text-sm">
    View your item
  </button>
</div>
</div>

              </div>

              {/* Action Buttons (Right) */}
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
        ))}
      </div>
    </div>
  );
};

export default Orders;
