import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faCheckCircle, faBullseye, faGift, faSearch } from "@fortawesome/free-solid-svg-icons";

const schemes = [
  {
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description:
      "A scheme that provides financial assistance to farmers for purchasing agricultural inputs and other needs.",
    eligibility:
      "Small and marginal farmers who own cultivable land of up to 2 hectares.",
    benefits:
      "₹6,000 annually, paid in three equal installments, directly to the bank account of the farmer.",
    color: "bg-[#283618]",
    link: "https://pmkisan.gov.in/", // Link to PM-KISAN official site
  },
  {
    name: "National Mission on Agricultural Extension and Technology",
    description:
      "Focuses on improving the productivity and income of farmers through various agricultural extension services.",
    eligibility:
      "Farmers, particularly those in underserved areas, requiring capacity building in farming techniques.",
    benefits:
      "Training on advanced farming techniques, provision of subsidies for adopting new technologies.",
    color: "bg-[#606C38]",
    link: "https://agri-horti.assam.gov.in/schemes/national-mission-on-agricultre-extension-technology-nmaet", // Link to official site
  },
  {
    name: "Fasal Bima Yojana",
    description:
      "Provides insurance coverage to farmers for losses due to natural calamities or pests affecting crops.",
    eligibility:
      "Farmers growing notified crops, with insurance premiums based on the type of crop and geographical area.",
    benefits:
      "Coverage for crop losses, with a minimal premium contribution from the farmer, especially in disaster-hit areas.",
    color: "bg-[#606C38]",
    link: "https://pmfby.gov.in/", // Link to Fasal Bima Yojana official site
  },
  {
    name: "Soil Health Management Scheme",
    description:
      "Aims to improve soil health through soil testing and providing recommendations to farmers for better agricultural practices.",
    eligibility:
      "Farmers across the country, especially those with soil degradation issues.",
    benefits:
      "Free soil testing and recommendations on crop rotation, fertilizers, and other practices to improve soil health.",
    color: "bg-[#283618]",
    link: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1988294", // Link to official site
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana",
    description:
      "Provides insurance coverage for farmers against crop loss due to natural calamities.",
    eligibility: "All farmers growing notified crops are eligible.",
    benefits:
      "Premium coverage for crops, reduced premiums for farmers in disaster-prone areas.",
    color: "bg-[#606C38]",
    link: "https://pmfby.gov.in/", // Link to PMFBY official site
  },
  {
    name: "Rashtriya Krishi Vikas Yojana",
    description:
      "Focuses on enhancing farm productivity through integrated development and investment.",
    eligibility:
      "State governments are the primary beneficiaries. Farmers can indirectly benefit.",
    benefits:
      "Infrastructure development, technology upgrades, and more accessible resources for farmers.",
    color: "bg-[#283618]",
    link: "https://www.agricoop.nic.in/en/schemes/rashtriya-krishi-vikas-yojana", // Link to official site
  },
];

const SchemeCard = ({ scheme, index, isSelected, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`cursor-pointer transform transition-all duration-300 ${
        isSelected ? 'col-span-2 row-span-2' : ''
      }`}
    >
      <motion.div 
        className="h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#283618] to-[#606C38] shadow-lg"
        whileHover={{ boxShadow: "0 20px 40px rgba(40, 54, 24, 0.2)" }}
      >
        <div className="p-6 h-full text-[#FEFAE0] relative">
          {/* Decorative Elements */}
          <motion.div 
            className="absolute top-0 right-0 w-32 h-32 bg-[#DDA15E]/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="space-y-6 relative z-10">
            {/* Header */}
            <div className="">
              <motion.div 
                className="w-12 h-12 rounded-xl bg-[#DDA15E]/20 flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FontAwesomeIcon icon={faLeaf} className="text-[#DDA15E] text-xl" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">{scheme.name}</h2>
              <motion.div 
                className="h-1 bg-[#DDA15E] rounded-full w-16"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
              />
            </div>

            {/* Content */}
            <AnimatePresence>
              {isSelected ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <div className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[#DDA15E]">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <h3 className="font-semibold">Description</h3>
                    </div>
                    <p className="text-[#FEFAE0]/90 leading-relaxed">
                      {scheme.description}
                    </p>
                  </div>

                  {/* Eligibility */}
                  <div className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[#DDA15E]">
                      <FontAwesomeIcon icon={faBullseye} />
                      <h3 className="font-semibold">Eligibility</h3>
                    </div>
                    <p className="text-[#FEFAE0]/90 leading-relaxed">
                      {scheme.eligibility}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[#DDA15E]">
                      <FontAwesomeIcon icon={faGift} />
                      <h3 className="font-semibold">Benefits</h3>
                    </div>
                    <p className="text-[#FEFAE0]/90 leading-relaxed">
                      {scheme.benefits}
                    </p>
                  </div>

                  {/* Apply Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#BC6C25" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-[#DDA15E] text-[#283618] rounded-xl font-semibold shadow-lg transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(scheme.link, "_blank");
                    }}
                  >
                    Apply for Scheme
                  </motion.button>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[#FEFAE0]/80 line-clamp-3"
                >
                  {scheme.description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SchemesPage = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFAE0] to-[#FEFAE0]/90 py-20 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-10 left-1/4 w-64 h-64 bg-[#606C38]/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-10 right-1/4 w-64 h-64 bg-[#DDA15E]/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative pt-14">
            <h1 className="text-5xl md:text-6xl font-bold text-[#283618] mb-6">
              Agricultural Schemes
            </h1>
            <p className="text-xl text-[#606C38] max-w-2xl mx-auto mb-12">
              Explore government initiatives designed to empower and support the farming community
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-md rounded-xl pl-12 pr-4 text-[#283618] placeholder-[#606C38]/60 focus:outline-none focus:ring-2 focus:ring-[#DDA15E] shadow-lg"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38]/60"
              />
            </div>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
        >
          <AnimatePresence>
            {filteredSchemes.map((scheme, index) => (
              <SchemeCard
                key={scheme.name}
                scheme={scheme}
                index={index}
                isSelected={selectedScheme === scheme.name}
                onClick={() => setSelectedScheme(selectedScheme === scheme.name ? null : scheme.name)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SchemesPage;