import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faLocationDot,
  faWeightScale,
  faShieldAlt,
  faTruck,
  faStore,
  faArrowLeft,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { Farmer, getAllFarmersCrops } from "../../../firebaseFunctions/cropFarmer";

const ItemPage = () => {
  const { cropId } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  const fetchCropImages = async (cropName) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${cropName}+agriculture&per_page=5`,
        {
          headers: {
            Authorization: import.meta.env.VITE_PEXELS_API_KEY,
          },
        }
      );
      const data = await response.json();
      if (data.photos) {
        setImages(data.photos.map(photo => photo.src.large));
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const allFarmers = await getAllFarmersCrops();
        const allCrops = allFarmers.flatMap(({ crops }) => crops);
        const foundCrop = allCrops.find(c => c.cropID === cropId);
        
        if (foundCrop) {
          setCrop(foundCrop);
          // Fetch images for the crop
          await fetchCropImages(foundCrop.cropName);
          
          const farmerData = allFarmers.find(f => 
            f.crops.some(c => c.cropID === cropId)
          );
          if (farmerData) {
            const fetchedFarmer = await Farmer.getFarmer(farmerData.farmerID);
            setFarmer(fetchedFarmer);
          }
        }
      } catch (error) {
        console.error("Error fetching crop details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [cropId]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= crop.cropWeight) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex(item => item.cropID === crop.cropID);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity = quantity;
    } else {
      cart.push({
        ...crop,
        quantity,
        totalPrice: crop.cropPrice * quantity
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // Add animation or notification here
  };

  const handleBuyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFAE0]/30">
        <FontAwesomeIcon icon={faLeaf} className="text-5xl text-[#606C38] animate-spin" />
      </div>
    );
  }

  if (!crop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FEFAE0]/30">
        <p className="text-lg text-[#283618]">Crop not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFAE0]/30 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-[#606C38] hover:text-[#283618]"
          whileHover={{ x: -5 }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Marketplace
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="aspect-square bg-[#FEFAE0] rounded-lg overflow-hidden">
              {images.length > 0 ? (
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={images[selectedImage]}
                  alt={crop.cropName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faLeaf} className="text-8xl text-[#606C38]/30" />
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index ? 'border-[#DDA15E]' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${crop.cropName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#283618] mb-2">{crop.cropName}</h1>
              <p className="text-xl text-[#606C38]">{crop.cropVariety}</p>
              <div className="flex items-center mt-2">
                {[...Array(4)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-[#DDA15E]" />
                ))}
                <FontAwesomeIcon icon={faStarHalf} className="text-[#DDA15E]" />
                <span className="ml-2 text-[#606C38]">(4.5)</span>
              </div>
            </div>

            <div className="border-t border-b border-[#DDA15E]/20 py-4">
              <div className="text-3xl font-bold text-[#BC6C25]">
                ₹{crop.cropPrice}
                <span className="text-sm font-normal text-[#606C38]">/kg</span>
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center border border-[#DDA15E]/20 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-2 text-[#606C38] hover:bg-[#FEFAE0]"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-[#DDA15E]/20">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-2 text-[#606C38] hover:bg-[#FEFAE0]"
                  >
                    +
                  </button>
                </div>
                <span className="text-[#606C38]">
                  {crop.cropWeight} kg available
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addToCart}
                className="w-full py-3 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium"
              >
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="w-full py-3 bg-[#DDA15E] text-[#FEFAE0] rounded-lg font-medium"
              >
                Buy Now
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: faTruck, text: "Free Delivery" },
                { icon: faShieldAlt, text: "Quality Assured" },
                { icon: faStore, text: "Direct from Farmer" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-[#FEFAE0] rounded-lg"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-2xl text-[#606C38] mb-2"
                  />
                  <p className="text-sm text-[#283618]">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* Product Details */}
              <div className="border-t border-[#DDA15E]/20 pt-4">
                <h3 className="font-semibold text-[#283618] mb-4">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faLocationDot} className="text-[#DDA15E]" />
                    <span className="text-[#606C38]">{crop.cropLocation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faWeightScale} className="text-[#DDA15E]" />
                    <span className="text-[#606C38]">{crop.cropWeight} kg total</span>
                  </div>
                </div>
              </div>

              {/* Farmer Information */}
              {farmer && (
                <div className="border-t border-[#DDA15E]/20 pt-4">
                  <h3 className="font-semibold text-[#283618] mb-4">Seller Information</h3>
                  <div className="bg-[#FEFAE0] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-[#283618]">{farmer.name}</h4>
                        <p className="text-[#606C38]">{farmer.emailID}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/farmer/${farmer.farmerID}`)}
                        className="px-4 py-2 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium"
                      >
                        View Profile
                      </motion.button>
                    </div>
                    {farmer.crops && farmer.crops.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-[#283618] mb-2">Other crops by this seller:</h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {farmer.crops.slice(0, 3).map((otherCrop) => (
                            <div
                              key={otherCrop.cropID}
                              className="bg-white p-3 rounded border border-[#DDA15E]/20"
                            >
                              <p className="font-medium text-[#283618]">{otherCrop.cropName}</p>
                              <p className="text-sm text-[#606C38]">₹{otherCrop.cropPrice}/kg</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="border-t border-[#DDA15E]/20 pt-4">
                <h3 className="font-semibold text-[#283618] mb-4">Terms & Conditions</h3>
                <div className="space-y-4 text-sm text-[#606C38]">
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-[#DDA15E] mt-1" />
                    <div>
                      <p className="font-medium text-[#283618]">Quality Guarantee</p>
                      <p>All products are quality checked before dispatch. If you're not satisfied with the quality, you can return within 24 hours of delivery.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faTruck} className="text-[#DDA15E] mt-1" />
                    <div>
                      <p className="font-medium text-[#283618]">Delivery Information</p>
                      <p>Free delivery for orders above ₹1000. Standard delivery time is 2-3 business days depending on your location.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FontAwesomeIcon icon={faStore} className="text-[#DDA15E] mt-1" />
                    <div>
                      <p className="font-medium text-[#283618]">Direct from Farmer</p>
                      <p>By purchasing this product, you're directly supporting local farmers and promoting sustainable agriculture.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage; 