import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingBag,
  faSignOutAlt,
  faBox,
  faMoneyBill,
  faChevronRight,
  faLocationDot,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

export default function BuyerProfile() {
  const { userID } = useParams();
  const [orders, setOrders] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
    
    const total = savedOrders.reduce((sum, order) => sum + order.total, 0);
    setTotalSpent(total);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0]/30">
      {/* Header */}
      <div className="bg-[#283618] text-[#FEFAE0] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#FEFAE0] rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-2xl text-[#283618]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-[#FEFAE0]/80">ID: {userID}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: faBox, label: "Total Orders", value: orders.length },
            { icon: faMoneyBill, label: "Total Spent", value: `₹${totalSpent}` },
            { icon: faLocationDot, label: "Delivery Address", value: "Bangalore" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#606C38]/10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={stat.icon} className="text-xl text-[#606C38]" />
                </div>
                <div>
                  <p className="text-sm text-[#606C38]">{stat.label}</p>
                  <p className="text-xl font-bold text-[#283618]">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-[#DDA15E]/20">
            <h2 className="text-xl font-bold text-[#283618]">Recent Orders</h2>
          </div>
          <div className="divide-y divide-[#DDA15E]/20">
            {orders.length > 0 ? (
              orders.map((order) => (
                <motion.div
                  key={order.orderId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-[#FEFAE0]/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendar} className="text-[#606C38]" />
                        <span className="text-[#606C38]">{formatDate(order.date)}</span>
                      </div>
                      <p className="font-medium text-[#283618]">Order #{order.orderId}</p>
                      <p className="text-sm text-[#606C38]">
                        {order.items.length} items • ₹{order.total}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {order.status}
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-[#606C38]"
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {order.items.map((item) => (
                      <div key={item.cropID} className="bg-[#FEFAE0]/30 rounded-lg p-3">
                        <p className="font-medium text-[#283618]">{item.cropName}</p>
                        <p className="text-sm text-[#606C38]">
                          {item.quantity}kg • ₹{item.cropPrice}/kg
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-4xl text-[#606C38]/30 mb-4"
                />
                <p className="text-[#606C38]">No orders yet</p>
              </div>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignOut}
          className="mt-8 px-6 py-3 bg-[#BC6C25] text-[#FEFAE0] rounded-lg font-medium flex items-center justify-center gap-2 mx-auto"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}
