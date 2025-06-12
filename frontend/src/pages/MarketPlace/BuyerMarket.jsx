import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  faSeedling,
  faLocationDot,
  faWeightScale,
  faSearch,
  faXmark,
  faLeaf,
  faShoppingBasket,
  faFilter,
  faSort,
  faStar,
  faStarHalf,
  faCartPlus,
  faCartShopping,
  faChevronLeft,
  faChevronRight,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllFarmersCrops } from "../../../firebaseFunctions/cropFarmer";
import { searchFarmerByCrop } from "../../../firebaseFunctions/cropFarmer";

const MotionCard = motion.div;

export default function ModernMarketplace() {
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [cropImages, setCropImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    location: [],
    rating: 0,
  });
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;


  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (crop) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cropID === crop.cropID);
      if (existingItem) {
        return prevCart.map(item =>
          item.cropID === crop.cropID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...crop, quantity: 1 }];
    });
  };

  const updateCartQuantity = (cropId, newQuantity) => {
    if (newQuantity < 1) {
      setCart(prevCart => prevCart.filter(item => item.cropID !== cropId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.cropID === cropId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const fetchCropImage = async (cropID, cropName) => {
    if (cropImages[cropID]) return; // Skip if image already fetched
    try {
      console.log(cropName);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: cropName,
            client_id: UNSPLASH_API_KEY,
            per_page: 1,
          },
        }
      );
      if (response.data.results.length > 0) {
        setCropImages((prevImages) => ({
          ...prevImages,
          [cropID]: response.data.results[0].urls.small,
        }));
      } else {
        setCropImages((prevImages) => ({
          ...prevImages,
          [cropID]: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching crop image from Unsplash", error);
    }
  };

  const getRandomRating = () => {
    const ratings = [3.5, 4.0, 4.5, 5.0];
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  useEffect(() => {
    const fetchCrops = async () => {
      setIsLoading(true);
      try {
        const farmersWithCrops = await getAllFarmersCrops();
        const allCrops = farmersWithCrops.flatMap(({ crops }) => crops);
        const cropsWithRatings = allCrops.map(crop => ({
          ...crop,
          rating: getRandomRating()
        }));
        setCrops(cropsWithRatings);
        
        // Load cart from localStorage
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(savedCart);
      } catch (error) {
        console.error("Error fetching crops", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const filteredAndSortedCrops = () => {
    // First filter
    const filtered = crops.filter((crop) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = (
        crop.cropName.toLowerCase().includes(search) ||
        crop.cropVariety.toLowerCase().includes(search) ||
        crop.cropLocation.toLowerCase().includes(search)
      );

      const matchesPrice = crop.cropPrice >= filters.priceRange[0] && crop.cropPrice <= filters.priceRange[1];
      const matchesLocation = filters.location.length === 0 || filters.location.includes(crop.cropLocation);
      const matchesRating = filters.rating === 0 || crop.rating >= filters.rating;

      return matchesSearch && matchesPrice && matchesLocation && matchesRating;
    });

    // Then sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.cropPrice - b.cropPrice;
        case 'price_high':
          return b.cropPrice - a.cropPrice;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'featured':
        default:
          // For featured, sort by a combination of rating and price
          const aScore = ((a.rating || 0) * 100) - (a.cropPrice * 0.1);
          const bScore = ((b.rating || 0) * 100) - (b.cropPrice * 0.1);
          return bScore - aScore;
      }
    });
  };

  const filteredCrops = filteredAndSortedCrops();

  const getMapUrl = (location) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodedLocation},India`;
  };

  const handlePurchaseClick = async (crop) => {
    try {
      const farmer = await searchFarmerByCrop(crop);
      if (farmer) {
        navigate(`/farmer/${farmer.farmerID}`);
      } else {
        console.error("No farmer found for this crop");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const CropCard = ({ crop, index }) => {
    useEffect(() => {
      fetchCropImage(crop.cropID, crop.cropName);
    }, [crop.cropID, crop.cropName]);

    const cartItem = cart.find(item => item.cropID === crop.cropID);

    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{
          scale: 1.005,
          boxShadow: "0 20px 25px -5px rgba(40, 54, 24, 0.1)",
        }}
        className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#DDA15E]/10 p-6"
      >
        <div className="flex gap-8">
          {/* Image */}
          <div 
            className="relative group w-64 h-64 flex-shrink-0 cursor-pointer"
            onClick={() => navigate(`/marketplace/${crop.cropID}`)}
          >
            <motion.div
              className="w-full h-full bg-[#FEFAE0] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {cropImages[crop.cropID] ? (
                <img
                  src={cropImages[crop.cropID]}
                  alt={crop.cropName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faSeedling} className="text-6xl text-[#606C38]/30" />
                </div>
              )}
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-[#606C38] opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div 
                className="cursor-pointer"
                onClick={() => navigate(`/marketplace/${crop.cropID}`)}
              >
                <h3 className="text-2xl font-medium text-[#283618] hover:text-[#606C38] transition-colors">
                  {crop.cropName}
                </h3>
                <p className="text-lg text-[#606C38] mt-1">{crop.cropVariety}</p>
              </div>

              <div className="flex items-center space-x-1 mt-3">
                {crop.rating ? (
                  <>
                    {[...Array(Math.floor(crop.rating || 0))].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-[#DDA15E] text-lg" />
                    ))}
                    {crop.rating % 1 !== 0 && (
                      <FontAwesomeIcon icon={faStarHalf} className="text-[#DDA15E] text-lg" />
                    )}
                    <span className="text-sm text-[#606C38] ml-2 font-medium">({crop.rating})</span>
                  </>
                ) : (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-[#DDA15E]/30 text-lg" />
                    ))}
                    <span className="text-sm text-[#606C38] ml-2">(No ratings)</span>
                  </>
                )}
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#BC6C25]">
                        ₹{crop.cropPrice}
                        <span className="text-base font-normal text-[#606C38] ml-1">/kg</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FEFAE0] px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <FontAwesomeIcon icon={faWeightScale} className="text-[#606C38]" />
                        <span className="text-sm font-medium text-[#606C38]">Available Stock</span>
                      </div>
                      <p className="text-xl font-bold text-[#283618]">{crop.cropWeight} kg</p>
                    </div>

                    <div className="bg-[#FEFAE0] px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <FontAwesomeIcon icon={faLocationDot} className="text-[#606C38]" />
                        <span className="text-sm font-medium text-[#606C38]">Location</span>
                      </div>
                      <p className="text-xl font-bold text-[#283618]">{crop.cropLocation}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#606C38] leading-relaxed">
                  Fresh {crop.cropName} sourced directly from local farmers. Premium quality, handpicked, and naturally grown without harmful pesticides.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              {cartItem ? (
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateCartQuantity(crop.cropID, cartItem.quantity - 1)}
                    className="w-10 h-10 bg-[#FEFAE0] rounded-lg flex items-center justify-center text-[#606C38] text-lg font-medium"
                  >
                    -
                  </motion.button>
                  <span className="text-lg font-medium text-[#283618] w-12 text-center">{cartItem.quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateCartQuantity(crop.cropID, cartItem.quantity + 1)}
                    className="w-10 h-10 bg-[#FEFAE0] rounded-lg flex items-center justify-center text-[#606C38] text-lg font-medium"
                  >
                    +
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(crop)}
                  className="px-6 py-3 bg-[#606C38] text-[#FEFAE0] rounded-lg flex items-center gap-3 shadow-sm text-lg font-medium"
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                  <span>Add to Cart</span>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/marketplace/${crop.cropID}`)}
                className="px-6 py-3 border-2 border-[#606C38] text-[#606C38] rounded-lg font-medium hover:bg-[#606C38] hover:text-[#FEFAE0] transition-colors"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </MotionCard>
    );
  };

  const CartSidebar = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.cropPrice), 0);

    return (
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-[#283618]">
                    Cart ({totalItems})
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCart(false)}
                    className="text-[#606C38]"
                  >
                    <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
                  </motion.button>
                </div>

                {cart.length > 0 ? (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <motion.div
                          key={item.cropID}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex items-center gap-4 p-4 bg-[#FEFAE0]/30 rounded-lg"
                        >
                          <div className="w-16 h-16 bg-[#FEFAE0] rounded-lg flex items-center justify-center">
                            {cropImages[item.cropID] ? (
                              <img
                                src={cropImages[item.cropID]}
                                alt={item.cropName}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faSeedling}
                                className="text-2xl text-[#606C38]/30"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-[#283618]">
                              {item.cropName}
                            </h3>
                            <p className="text-sm text-[#606C38]">
                              ₹{item.cropPrice}/kg
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateCartQuantity(item.cropID, item.quantity - 1)}
                              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#606C38]"
                            >
                              -
                            </motion.button>
                            <span className="text-[#283618] font-medium">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateCartQuantity(item.cropID, item.quantity + 1)}
                              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#606C38]"
                            >
                              +
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="border-t border-[#DDA15E]/20 pt-4 space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-[#283618]">Subtotal</span>
                        <span className="text-[#BC6C25]">₹{subtotal}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium"
                        onClick={() => {
                          setShowCart(false);
                          navigate('/checkout');
                        }}
                      >
                        Proceed to Checkout
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <FontAwesomeIcon
                      icon={faShoppingBasket}
                      className="text-5xl text-[#606C38]/30 mb-4"
                    />
                    <p className="text-[#606C38]">Your cart is empty</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  const CropModal = ({ crop }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedCrop(null)}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-[#FEFAE0] rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#283618] text-[#FEFAE0] p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Crop Details</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedCrop(null)}
              className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl font-bold text-[#283618]">
                    {crop.cropName}
                  </h2>
                  <p className="text-lg text-[#606C38]">{crop.cropVariety}</p>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center space-x-3 text-[#606C38]">
                    <FontAwesomeIcon icon={faWeightScale} className="w-5 h-5" />
                    <span className="text-lg">{crop.cropWeight} kg</span>
                  </div>
                  <div className="flex items-center space-x-3 text-[#606C38]">
                    <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5" />
                    <span className="text-lg">{crop.cropLocation}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-[#BC6C25]">
                      ₹{crop.cropPrice}
                    </span>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#283618" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePurchaseClick(crop)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full py-3 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium text-lg shadow-md"
                >
                  Contact Farmer
                </motion.button>
              </div>

              <motion.div 
                className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <iframe
                  title={`Map showing location of ${crop.cropName}`}
                  src={getMapUrl(crop.cropLocation)}
                  className="w-full h-full border-0 rounded-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <motion.div 
      className="min-h-screen bg-[#FEFAE0]/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-[#283618] text-[#FEFAE0] top-0 z-40 shadow-md ">
        <div className="max-w-7xl mx-auto px-4 py-4 pt-[100px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-2xl font-bold flex items-center"
              >
                <FontAwesomeIcon icon={faShoppingBasket} className="mr-3" />
                Crop Marketplace
              </motion.h1>
              <div className="relative flex-1 max-w-xl">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38]"
                />
                <motion.input
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  type="text"
                  className="w-full pl-12 pr-4 py-2 rounded-lg bg-[#FEFAE0] text-[#283618] placeholder-[#606C38]/60"
                  placeholder="Search crops, varieties, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
                onClick={() => setShowCart(true)}
              >
                <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
                {cart.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-[#DDA15E] rounded-full text-xs flex items-center justify-center"
                  >
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="font-semibold text-[#283618] mb-4">Filters</h2>
              
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium text-[#606C38] mb-2">Price Range</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                      }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[#606C38]">
                      <span>₹{filters.priceRange[0]}</span>
                      <span>₹{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-sm font-medium text-[#606C38] mb-2">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => setFilters(prev => ({ ...prev, rating }))}
                          className="text-[#DDA15E]"
                        />
                        <div className="flex items-center">
                          {[...Array(rating)].map((_, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className="text-[#DDA15E] text-sm"
                            />
                          ))}
                          <span className="text-sm text-[#606C38] ml-1">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <h3 className="text-sm font-medium text-[#606C38] mb-2">Location</h3>
                  <div className="space-y-2">
                    {["Bangalore", "Mumbai", "Delhi", "Chennai"].map((location) => (
                      <label key={location} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.location.includes(location)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                location: [...prev.location, location]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                location: prev.location.filter(l => l !== location)
                              }));
                            }
                          }}
                          className="text-[#DDA15E]"
                        />
                        <span className="text-sm text-[#606C38]">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#283618]">
                {filteredCrops.length} Products
              </h2>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-[#DDA15E]/20 rounded-lg text-[#606C38]"
                >
                  <option value="featured">Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsGridView(!isGridView)}
                  className="p-2 bg-white border border-[#DDA15E]/20 rounded-lg text-[#606C38]"
                >
                  <FontAwesomeIcon icon={isGridView ? faSort : faSort} />
                </motion.button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faSeedling} 
                    className="text-5xl text-[#606C38]" 
                  />
                </motion.div>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6"
              >
                <AnimatePresence>
                  {filteredCrops.length > 0 ? (
                    filteredCrops.map((crop, index) => (
                      <CropCard key={crop.cropID} crop={crop} index={index} />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full text-center py-12"
                    >
                      <FontAwesomeIcon
                        icon={faLeaf}
                        className="w-16 h-16 text-[#606C38]/30 mb-4"
                      />
                      <p className="text-xl text-[#606C38]">
                        No crops found matching your search
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </motion.div>
  );
}
