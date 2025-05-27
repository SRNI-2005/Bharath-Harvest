import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faQrcode,
  faMoneyBill,
  faCheck,
  faArrowLeft,
  faShieldAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const CircleProgress = ({ progress }) => (
  <motion.div className="relative w-16 h-16">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="10"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#606C38"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{
          rotate: -90,
          transformOrigin: "50% 50%",
          strokeDasharray: "283",
          strokeDashoffset: "283",
        }}
      />
    </svg>
    {progress === 1 && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faCheck} className="text-2xl text-[#606C38]" />
      </motion.div>
    )}
  </motion.div>
);

const ConfirmationDialog = ({ onConfirm, onCancel, total, paymentMethod }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-[#FEFAE0] rounded-full flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl text-[#DDA15E]" />
        </div>
        <h2 className="text-2xl font-bold text-[#283618] mb-2">Confirm Order</h2>
        <p className="text-[#606C38]">
          You are about to place an order for ₹{total} using {paymentMethod}.
        </p>
      </div>

      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="w-full py-3 bg-[#606C38] text-white rounded-lg font-medium"
        >
          Confirm Payment
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="w-full py-3 border-2 border-[#606C38] text-[#606C38] rounded-lg font-medium"
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const PaymentSuccess = ({ onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        className="bg-white rounded-lg p-8 text-center max-w-md mx-4"
      >
        <div className="flex justify-center mb-6">
          <CircleProgress progress={progress} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <h2 className="text-2xl font-bold text-[#283618] mb-2">Payment Successful!</h2>
          <p className="text-[#606C38] mb-6">Your order has been placed successfully.</p>
          <div className="bg-[#FEFAE0] rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-[#606C38]">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span className="text-sm">Order confirmation sent to your email</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-6 py-2 bg-[#606C38] text-white rounded-lg"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.cropPrice), 0);
  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: faCreditCard },
    { id: "upi", name: "UPI", icon: faQrcode },
    { id: "cod", name: "Cash on Delivery", icon: faMoneyBill },
  ];

  const getPaymentMethodName = (id) => {
    const method = paymentMethods.find(m => m.id === id);
    return method ? method.name : '';
  };

  const handlePaymentStart = () => {
    if (!selectedPayment) return;
    setShowConfirmation(true);
  };

  const handlePaymentConfirm = () => {
    setShowConfirmation(false);

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      orderId: Date.now().toString(),
      items: cart,
      total,
      date: new Date().toISOString(),
      status: "Confirmed",
      paymentMethod: selectedPayment,
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.setItem("cart", "[]");
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/marketplace");
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0]/30 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-[#606C38] hover:text-[#283618]"
          whileHover={{ x: -5 }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Cart
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-[#283618] mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.cropID} className="flex justify-between items-center py-2 border-b border-[#DDA15E]/20">
                  <div>
                    <h3 className="font-medium text-[#283618]">{item.cropName}</h3>
                    <p className="text-sm text-[#606C38]">Quantity: {item.quantity}kg</p>
                  </div>
                  <p className="font-medium text-[#BC6C25]">₹{item.quantity * item.cropPrice}</p>
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-[#606C38]">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#606C38]">
                  <span>Platform Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-[#283618] pt-2 border-t border-[#DDA15E]/20">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-[#283618] mb-6">Payment Method</h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                      selectedPayment === method.id
                        ? "border-[#606C38] bg-[#606C38]/5"
                        : "border-[#DDA15E]/20 hover:border-[#DDA15E]"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={method.icon}
                      className={`text-2xl ${
                        selectedPayment === method.id
                          ? "text-[#606C38]"
                          : "text-[#606C38]/60"
                      }`}
                    />
                    <span className={`font-medium ${
                      selectedPayment === method.id
                        ? "text-[#283618]"
                        : "text-[#606C38]"
                    }`}>
                      {method.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePaymentStart}
              disabled={!selectedPayment}
              className={`w-full py-4 rounded-lg font-medium text-white ${
                selectedPayment
                  ? "bg-[#606C38] hover:bg-[#283618]"
                  : "bg-[#606C38]/50 cursor-not-allowed"
              }`}
            >
              Pay Now
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showConfirmation && (
          <ConfirmationDialog
            onConfirm={handlePaymentConfirm}
            onCancel={() => setShowConfirmation(false)}
            total={total}
            paymentMethod={getPaymentMethodName(selectedPayment)}
          />
        )}
        {showSuccess && <PaymentSuccess onClose={handleSuccessClose} />}
      </AnimatePresence>
    </div>
  );
};

export default Checkout; 