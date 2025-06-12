import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Farmer } from "../../../firebaseFunctions/cropFarmer";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faLocationDot,
  faWeightScale,
  faDollarSign,
  faEnvelope,
  faArrowLeft,
  faSeedling,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const PublicFarmerProfile = () => {
  const { farmerID } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const fetchedFarmer = await Farmer.getFarmer(farmerID);
        setFarmer(fetchedFarmer);
        const fetchedCrops = await fetchedFarmer.getCrops();
        setCrops(fetchedCrops);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, [farmerID]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEFAE0]/30 to-[#FEFAE0]/50">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <FontAwesomeIcon 
            icon={faSeedling} 
            className="text-5xl text-[#606C38]" 
          />
        </motion.div>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEFAE0]/30 to-[#FEFAE0]/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg text-[#283618] bg-white p-8 rounded-2xl shadow-xl"
        >
          <p className="mb-4">Farmer not found.</p>
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-[#606C38] hover:text-[#283618] transition-colors"
            whileHover={{ x: -5 }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Back
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[#FEFAE0]/30 to-[#FEFAE0]/50 py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Farmer Info Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden bg-gradient-to-r from-[#283618] to-[#606C38] rounded-2xl p-8 text-center shadow-xl mb-8"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold text-[#FEFAE0] mb-2">
              {farmer.name}
            </h1>
            <div className="h-1 w-24 bg-[#DDA15E] mx-auto rounded-full mb-4" />
            <a
              href={"mailto:" + farmer.emailID}
              className="inline-flex items-center gap-2 text-[#DDA15E] hover:text-[#BC6C25] transition-colors"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span>{farmer.emailID}</span>
            </a>
          </motion.div>

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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { icon: faLeaf, label: "Total Crops", value: crops.length },
            { icon: faChartLine, label: "Success Rate", value: "98%" },
            { icon: faLocationDot, label: "Location", value: "Karnataka" }
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

        {/* Available Crops */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-[#DDA15E]/20">
            <h2 className="text-2xl font-bold text-[#283618] flex items-center gap-2">
              <FontAwesomeIcon icon={faLeaf} className="text-[#606C38]" />
              Available Crops
            </h2>
          </div>

          {crops.length > 0 ? (
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDA15E]/20">
                  <AnimatePresence>
                    {crops.map((crop) => (
                      <motion.tr
                        key={crop.cropID}
                        className="hover:bg-[#FEFAE0]/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedCrop(crop)}
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faLeaf} className="text-[#606C38]" />
                            <span className="font-medium text-[#283618]">{crop.cropName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#283618]">{crop.cropVariety}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faDollarSign} className="text-[#BC6C25]" />
                            <span className="font-medium text-[#BC6C25]">₹{crop.cropPrice}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faWeightScale} className="text-[#606C38]" />
                            <span className="text-[#283618]">{crop.cropWeight} kg</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faLocationDot} className="text-[#DDA15E]" />
                            <span className="text-[#283618]">{crop.cropLocation}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <motion.div
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
                <FontAwesomeIcon icon={faLeaf} className="text-6xl text-[#606C38]/30 mb-4" />
              </motion.div>
              <p className="text-lg text-[#606C38]">No crops available at this time.</p>
            </motion.div>
          )}
        </motion.div>
        
        {/* Back Button */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-[#606C38] text-[#FEFAE0] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 font-medium inline-flex items-center gap-2"
            whileHover={{ scale: 1.02, backgroundColor: "#283618" }}
            whileTap={{ scale: 0.98 }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Back
          </motion.button>
        </motion.div>
      </div>

      {/* Crop Details Modal */}
      <AnimatePresence>
        {selectedCrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCrop(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-[#283618] mb-4">{selectedCrop.cropName}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#606C38]">Variety</span>
                  <span className="font-medium text-[#283618]">{selectedCrop.cropVariety}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#606C38]">Price per kg</span>
                  <span className="font-medium text-[#BC6C25]">₹{selectedCrop.cropPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#606C38]">Available Weight</span>
                  <span className="font-medium text-[#283618]">{selectedCrop.cropWeight} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#606C38]">Location</span>
                  <span className="font-medium text-[#283618]">{selectedCrop.cropLocation}</span>
                </div>
              </div>
              <motion.button
                className="w-full mt-6 px-4 py-3 bg-[#606C38] text-[#FEFAE0] rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCrop(null)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PublicFarmerProfile;
