import React, { useEffect, useState } from "react";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "/new_logo2.png";
import { FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faBook, faLandmark, faPhone, faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";

// Logo component with updated styling
const Logo = ({ shrink }) => (
  <motion.div 
    className={`flex items-center space-x-2 transition-all duration-300 ${shrink ? 'scale-90' : ''}`}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <img src={logo} alt="logo" className={`transition-all duration-300 ${shrink ? 'h-8' : 'h-10'} w-auto`} />
    <div className="font-bold flex">
      <motion.span 
        className={`text-[#BC6C25] transition-all duration-300 ${shrink ? 'text-2xl' : 'text-3xl'}`}
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Bharath
      </motion.span>
      <motion.span 
        className={`text-[#606C38] transition-all duration-300 ${shrink ? 'text-2xl' : 'text-3xl'}`}
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Harvest
      </motion.span>
    </div>
  </motion.div>
);

const Navbar = ({ farmer }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribeScroll = scrollY.onChange(y => {
      setIsScrolled(y > 20);
    });

    return () => {
      unsubscribeScroll();
    };
  }, [scrollY]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      toast.success("Successfully signed out!");
    } catch (error) {
      console.error("Error signing out: ", error);
      toast.error("Error signing out!");
    }
  };

  const getUsername = (email) => {
    if (!email) return "User";
    return email.split("@")[0];
  };
  const navItems = [
    { path: "/marketplace", label: "Shop", icon: faShop },
    // { path: "/learn", label: "Learn", icon: faBook },
    // { path: "/schemes", label: "Schemes", icon: faLandmark },
    { path: "/predictor", label: "Predictor", icon: faChartLine },
    { path: "/support", label: "Support", icon: faPhone },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -5 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <motion.div 
        className="max-w-5xl mx-auto bg-[#283618]/95 backdrop-blur-md rounded-full shadow-lg
          shadow-[#283618]/20 pointer-events-auto border border-white"
      >
        <div className="flex justify-between items-center h-16 px-6">
          <motion.div 
            className="cursor-pointer" 
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Logo shrink={true} />
          </motion.div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FEFAE0]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </motion.button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-[#FEFAE0]/90 hover:text-[#DDA15E] relative py-2 flex items-center gap-2
                  px-3 rounded-full hover:bg-[#FEFAE0]/10 transition-all duration-300"
                custom={i}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.label}
              </motion.button>
            ))}

            {user ? (
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-full
                    text-[#FEFAE0] bg-[#FEFAE0]/10 hover:bg-[#FEFAE0]/20 transition-all duration-300"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  <FaUserCircle className="text-xl text-[#DDA15E]" />
                  <span className="font-medium">{getUsername(user.email)}</span>
                  <motion.span 
                    animate={{ rotate: dropdownVisible ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </motion.div>

                <AnimatePresence>
                  {dropdownVisible && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-48 bg-[#283618] rounded-xl shadow-lg py-1 z-50
                        border border-[#FEFAE0]/10 backdrop-blur-md"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.button
                        className="block w-full text-left px-4 py-2 text-[#FEFAE0]/90 hover:bg-[#FEFAE0]/10"
                        whileHover={{ x: 5 }}
                        onClick={() =>
                          navigate(
                            farmer
                              ? `/profile/${farmer.farmerID}`
                              : `/profile/${user.uid}`
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-[#DDA15E]" />
                        My Profile
                      </motion.button>
                      <motion.button
                        className="block w-full text-left px-4 py-2 text-[#FEFAE0]/90 hover:bg-[#FEFAE0]/10"
                        whileHover={{ x: 5 }}
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-full bg-[#DDA15E] text-[#283618] hover:bg-[#BC6C25]
                  transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Sign in
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-4 right-4 mt-2"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div 
                className="bg-[#283618] rounded-2xl shadow-lg overflow-hidden
                  border border-[#FEFAE0]/10 backdrop-blur-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="p-4 space-y-3">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-left px-3 py-2 text-[#FEFAE0]/90
                        hover:bg-[#FEFAE0]/10 rounded-lg"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <FontAwesomeIcon icon={item.icon} className="text-[#DDA15E]" />
                      {item.label}
                    </motion.button>
                  ))}

                  {user ? (
                    <>
                      <motion.button
                        onClick={() => {
                          navigate(`/profile/${user.uid}`);
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 text-[#FEFAE0]/90
                          hover:bg-[#FEFAE0]/10 rounded-lg"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                      >
                        <FontAwesomeIcon icon={faUser} className="text-[#DDA15E]" />
                        My Profile
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 text-[#FEFAE0]/90
                          hover:bg-[#FEFAE0]/10 rounded-lg"
                        variants={itemVariants}
                        whileHover={{ x: 5 }}
                      >
                        Sign Out
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-center px-3 py-2 text-[#283618] bg-[#DDA15E]
                        hover:bg-[#BC6C25] rounded-lg mt-3"
                      variants={itemVariants}
                    >
                      Sign in
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <ToastContainer />
    </motion.nav>
  );
};

export default Navbar;