import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeTab, setActiveTab] = useState("recent"); // recent or all

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#FEFAE0]/30 to-[#FEFAE0]/50 py-8 pt-[110px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#283618] to-[#606C38] p-8 mb-8 shadow-xl"
          variants={itemVariants}
        >
          <div className="relative z-10 flex items-center gap-6">
            <motion.div
              className="w-20 h-20 bg-[#FEFAE0] rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faUser} className="text-3xl text-[#283618]" />
            </motion.div>
            <div>
              <motion.h1
                className="text-3xl font-bold text-[#FEFAE0]"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome Back!
              </motion.h1>
              <motion.p
                className="text-[#FEFAE0]/80 mt-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                ID: {userID}
              </motion.p>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: faBox, label: "Orders", value: orders.length },
            { icon: faMoneyBill, label: "Total Spent", value: `₹${totalSpent}` },
            { icon: faLocationDot, label: "Delivery Location", value: "Bangalore" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#606C38]/10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={stat.icon} className="text-xl text-[#606C38]" />
                </div>
                <div>
                  <p className="text-sm text-[#606C38] font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#283618]">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Orders Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="border-b border-[#DDA15E]/20">
            <div className="flex p-6">
              <motion.button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "recent"
                    ? "bg-[#606C38] text-[#FEFAE0]"
                    : "text-[#606C38] hover:bg-[#606C38]/10"
                }`}
                onClick={() => setActiveTab("recent")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Recent Orders
              </motion.button>
              <motion.button
                className={`px-4 py-2 rounded-lg font-medium ml-2 transition-colors ${
                  activeTab === "all"
                    ? "bg-[#606C38] text-[#FEFAE0]"
                    : "text-[#606C38] hover:bg-[#606C38]/10"
                }`}
                onClick={() => setActiveTab("all")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                All Orders
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-[#DDA15E]/20"
            >
              {orders.length > 0 ? (
                orders.map((order) => (
                  <motion.div
                    key={order.orderId}
                    className="p-6 hover:bg-[#FEFAE0]/30 transition-colors"
                    whileHover={{ x: 5 }}
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
                        <motion.div whileHover={{ x: 5 }}>
                          <FontAwesomeIcon icon={faChevronRight} className="text-[#606C38]" />
                        </motion.div>
                      </div>
                    </div>

                    <motion.div
                      className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                      variants={containerVariants}
                    >
                      {order.items.map((item) => (
                        <motion.div
                          key={item.cropID}
                          className="bg-[#FEFAE0]/30 rounded-xl p-4 hover:shadow-md transition-shadow"
                          whileHover={{ scale: 1.02 }}
                        >
                          <p className="font-medium text-[#283618]">{item.cropName}</p>
                          <p className="text-sm text-[#606C38]">
                            {item.quantity}kg • ₹{item.cropPrice}/kg
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="p-12 text-center"
                  variants={itemVariants}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faShoppingBag}
                      className="text-5xl text-[#606C38]/30 mb-4"
                    />
                  </motion.div>
                  <p className="text-[#606C38] text-lg">No orders yet</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Sign Out Button */}
        <motion.button
          onClick={handleSignOut}
          className="mt-8 px-8 py-4 bg-[#BC6C25] text-[#FEFAE0] rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center gap-2 mx-auto"
          whileHover={{ scale: 1.02, backgroundColor: "#9c5a1d" }}
          whileTap={{ scale: 0.98 }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
}
