import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseFunctions/firebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLeaf, 
  faPlus, 
  faEdit,
  faTrash,
  faSignOutAlt,
  faCog,
  faChartLine,
  faWheatAwn,
  faLocationDot,
  faCoins
} from "@fortawesome/free-solid-svg-icons";
import { Settings, LogOut, Sprout } from "lucide-react";
import { Farmer, Crop } from "../../../firebaseFunctions/cropFarmer";
import Modal from "../MarketPlace/Modal";

export default function FarmerProfile() {
  const [farmer, setFarmer] = useState(null);
  const [crops, setCrops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [cropData, setCropData] = useState({
    cropName: "",
    cropVariety: "",
    cropPrice: "",
    cropWeight: "",
    cropLocation: "",
  });
  const { userID } = useParams();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    if (!farmer) return;

    try {
      const crop = new Crop(
        cropData.cropName,
        cropData.cropVariety,
        parseFloat(cropData.cropPrice),
        parseFloat(cropData.cropWeight),
        cropData.cropLocation
      );

      if (editingCrop) {
        crop.cropID = editingCrop.cropID;
        await farmer.updateCrop(crop);
      } else {
        await farmer.addCrop(crop);
      }

      const fetchedCrops = await farmer.getCrops();
      setCrops(fetchedCrops);
      handleModalClose();
    } catch (error) {
      console.error("Error saving crop:", error);
    }
  };

  useEffect(() => {
    async function fetchFarmer() {
      try {
        const fetchedFarmer = await Farmer.getFarmer(userID);
        setFarmer(fetchedFarmer);
        return fetchedFarmer;
      } catch (error) {
        console.error("Error fetching farmer details:", error);
        return null;
      }
    }

    async function fetchCrops(farmer) {
      if (!farmer) return;
      try {
        const fetchedCrops = await farmer.getCrops();
        setCrops(fetchedCrops);
      } catch (error) {
        console.error("Error fetching farmer crops:", error);
      }
    }

    fetchFarmer().then(fetchCrops);
  }, [userID]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCrop(null);
    setCropData({
      cropName: "",
      cropVariety: "",
      cropPrice: "",
      cropWeight: "",
      cropLocation: "",
    });
  };

  const deleteCrop = async (crop) => {
    if (!farmer) return;
    try {
      await farmer.deleteCrop(crop.cropID);
      const fetchedCrops = await farmer.getCrops();
      setCrops(fetchedCrops);
    } catch (error) {
      console.error("Error deleting crop:", error);
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

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[#FEFAE0]/30 to-[#FEFAE0]/50 py-12 pt-[120px] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#283618] to-[#606C38] px-8 py-12 text-center shadow-xl mb-8"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.3 
            }}
            className="w-24 h-24 bg-[#FEFAE0] rounded-2xl flex justify-center items-center mx-auto mb-6 shadow-lg"
          >
            <Sprout className="w-12 h-12 text-[#606C38]" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-[#FEFAE0] mb-3">
            Farmer Dashboard
          </h2>
          <motion.div 
            className="h-1 w-24 bg-[#DDA15E] mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <span className="text-[#FEFAE0]/80 bg-[#606C38]/50 px-4 py-2 rounded-xl text-sm">
            ID: {userID}
          </span>

          {/* Decorative Background Elements */}
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { icon: faWheatAwn, title: "Total Crops", value: crops.length },
            { icon: faCoins, title: "Revenue", value: "₹50,000" },
            { icon: faChartLine, title: "Growth", value: "+25%" }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#606C38]/10 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={stat.icon} className="text-xl text-[#606C38]" />
                </div>
                <div>
                  <p className="text-sm text-[#606C38] font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-[#283618]">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex justify-between items-center p-6 border-b border-[#DDA15E]/20">
            <h3 className="text-xl font-bold text-[#283618] flex items-center gap-2">
              <FontAwesomeIcon icon={faLeaf} className="text-[#606C38]" />
              Your Crops
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#606C38] text-[#FEFAE0] rounded-xl font-medium inline-flex items-center gap-2 shadow-md hover:bg-[#283618] transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add New Crop
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FEFAE0]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#606C38] uppercase tracking-wider">
                    Crop Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#606C38] uppercase tracking-wider">
                    Variety
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#606C38] uppercase tracking-wider">
                    Price/kg
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#606C38] uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#606C38] uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-[#606C38] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDA15E]/10">
                <AnimatePresence>
                  {crops.length > 0 ? (
                    crops.map((crop) => (
                      <motion.tr
                        key={crop.cropID}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="hover:bg-[#FEFAE0]/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faLeaf} className="text-[#606C38]" />
                            <span className="font-medium text-[#283618]">{crop.cropName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#283618]">{crop.cropVariety}</td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-[#BC6C25]">₹{crop.cropPrice}</span>
                        </td>
                        <td className="px-6 py-4 text-[#283618]">{crop.cropWeight} kg</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faLocationDot} className="text-[#DDA15E]" />
                            <span>{crop.cropLocation}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setEditingCrop(crop);
                                setIsModalOpen(true);
                              }}
                              className="p-2 text-[#606C38] hover:bg-[#606C38]/10 rounded-lg transition-colors"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteCrop(crop)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <motion.div 
                          className="flex flex-col items-center text-[#606C38]"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          <FontAwesomeIcon icon={faLeaf} className="text-5xl mb-3 opacity-50" />
                          <p className="text-lg">No crops added yet. Click "Add New Crop" to get started.</p>
                        </motion.div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <motion.button 
            className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-4 bg-[#606C38] text-[#FEFAE0] rounded-xl shadow-md font-medium"
            whileHover={{ scale: 1.02, backgroundColor: "#283618" }}
            whileTap={{ scale: 0.98 }}
          >
            <Settings className="w-5 h-5" />
            Account Settings
          </motion.button>
          <motion.button
            onClick={handleSignOut}
            className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-4 bg-[#BC6C25] text-[#FEFAE0] rounded-xl shadow-md font-medium"
            whileHover={{ scale: 1.02, backgroundColor: "#9c5a1d" }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal Component would go here */}
    </motion.div>
  );
}