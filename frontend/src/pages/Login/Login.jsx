import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faEnvelope, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../firebaseFunctions/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Farmer } from "../../../firebaseFunctions/cropFarmer";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password || (isSignUp && !category)) {
      toast.error("Please fill in all fields!");
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (category === "farmer") {
          const farmer = new Farmer(email);
          await farmer.addFarmer();
        }
        toast.success("Welcome to BharathHarvest! 🌱", {
          onClose: () => navigate("/")
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back! 🌿", {
          onClose: () => navigate("/")
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#FEFAE0]/95 to-[#FEFAE0]/80">
      <motion.div 
        className="h-screen flex flex-col lg:flex-row"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {/* Left Panel - Decorative */}
        <motion.div 
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#283618] to-[#606C38]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-pattern opacity-10" />
          
          <div className="relative z-10 flex flex-col justify-center items-center text-[#FEFAE0] p-12">
            <motion.div
              className="mb-8"
              animate={{ 
                rotateZ: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              <FontAwesomeIcon icon={faSeedling} className="text-7xl" />
            </motion.div>

            <motion.h1 
              className="text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Welcome to
              <span className="block text-[#DDA15E] mt-2">BharathHarvest</span>
            </motion.h1>

            <motion.p
              className="text-xl text-[#FEFAE0]/80 text-center max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Join our community of farmers and buyers to revolutionize agricultural commerce
            </motion.p>
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute bottom-0 left-0 w-96 h-96 bg-[#FEFAE0]/5 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-[#DDA15E]/10 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
        </motion.div>

        {/* Right Panel - Form */}
        <motion.div 
          className="flex-1 flex items-center justify-center p-6 lg:p-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-full max-w-md"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl font-bold text-[#283618] mb-8"
              variants={itemVariants}
            >
              {isSignUp ? "Create Your Account" : "Welcome Back"}
            </motion.h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#606C38] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faEnvelope} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38]/50"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-[#606C38]/20 focus:border-[#DDA15E] focus:ring-2 focus:ring-[#DDA15E]/20 transition-all duration-200 outline-none text-[#283618]"
                    placeholder="Enter your email"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[#606C38] mb-2">
                  Password
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faLock} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38]/50"
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-[#606C38]/20 focus:border-[#DDA15E] focus:ring-2 focus:ring-[#DDA15E]/20 transition-all duration-200 outline-none text-[#283618]"
                    placeholder="Enter your password"
                  />
                </div>
              </motion.div>

              {/* Category Selection */}
              {isSignUp && (
                <motion.div 
                  variants={itemVariants}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium text-[#606C38]">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["farmer", "buyer"].map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        onClick={() => setCategory(type)}
                        className={`
                          flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                          ${category === type 
                            ? 'border-[#DDA15E] bg-[#DDA15E]/10 text-[#283618]' 
                            : 'border-[#606C38]/20 hover:border-[#606C38]/40 text-[#606C38]'
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="capitalize">{type}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#606C38] to-[#283618] text-[#FEFAE0] rounded-xl font-medium shadow-lg flex items-center justify-center gap-2 group"
                variants={itemVariants}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </motion.div>
              </motion.button>

              {/* Toggle Auth Mode */}
              <motion.p 
                className="text-center text-[#606C38] mt-6"
                variants={itemVariants}
              >
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <motion.button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#DDA15E] font-medium hover:text-[#BC6C25] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSignUp ? "Sign In" : "Create One"}
                </motion.button>
              </motion.p>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
