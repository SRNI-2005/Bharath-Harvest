import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf, faChartLine, faWater, faFlask,
  faSeedling, faMoneyBillWave, faSpinner,
  faExclamationTriangle, faArrowRight
} from '@fortawesome/free-solid-svg-icons';

const regions = ['Bangalore', 'Mysore', 'Hubli', 'Belgaum', 'Gulbarga', 'Mangalore'];

const BackgroundDecoration = ({ className }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.25, 0.15],
      rotate: [0, 90, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const CropPredictor = () => {
  const [form, setForm] = useState({
    n_value: '',
    p_value: '',
    k_value: '',
    region: '',
    area: '',
    season: 'Kharif',
  });
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPlans(null);
    setError(null);
    try {
      const url = form.season === 'Kharif'
        ? 'http://localhost:5004/api/predict/kharif'
        : 'http://localhost:5004/api/predict/rabi';
      
      const response = await axios.post(url, {
        n_value: parseFloat(form.n_value),
        p_value: parseFloat(form.p_value),
        k_value: parseFloat(form.k_value),
        region: form.region,
        area: parseFloat(form.area),
      });

      if (response.data.status === 'success') {
        setPlans(response.data.plans);
      } else {
        setError('Failed to generate crop plans. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatFertilizer = (fert) => {
    return fert.map(v => v.toFixed(2)).join(' : ');
  };

  const calculateTotalRevenue = (entries) => {
    return entries.reduce((sum, entry) => sum + entry['Revenue (INR)'], 0);
  };

  const calculateAverageYield = (entries) => {
    return entries.reduce((sum, entry) => sum + entry['Predicted Yield (q/ha)'], 0) / entries.length;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#FEFAE0] to-[#FEFAE0]/70 py-20 pt-[110px] px-4">
      {/* Background Decorations */}
      <BackgroundDecoration className="top-0 left-1/4 w-[500px] h-[500px] bg-[#606C38]" />
      <BackgroundDecoration className="bottom-0 right-1/4 w-[600px] h-[600px] bg-[#DDA15E]" />
      <BackgroundDecoration className="top-1/4 right-1/3 w-[400px] h-[400px] bg-[#BC6C25]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto relative"
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#606C38] to-[#283618] shadow-lg flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faSeedling} className="text-4xl text-[#FEFAE0]" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-[#283618] mb-6 tracking-tight">
            Intelligent Crop Planning
          </h1>
          <p className="text-xl text-[#606C38] max-w-2xl mx-auto leading-relaxed">
            Advanced AI-powered recommendations for optimal crop rotation and yield maximization
          </p>
        </motion.div>

        {/* Input Form - Glass Card */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative max-w-3xl mx-auto backdrop-blur-lg bg-white/80 rounded-3xl p-8 shadow-2xl mb-12 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - NPK Values */}
            <div className="space-y-6">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-[#283618] font-medium mb-2">
                  Nitrogen (N) Value
                </label>
                <div className="relative group">
                  <FontAwesomeIcon 
                    icon={faFlask} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38] transition-all duration-300 group-hover:text-[#283618]" 
                  />
                  <motion.input
                    type="number"
                    name="n_value"
                    value={form.n_value}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-xl border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all"
                    placeholder="Enter N value"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="block text-[#283618] font-medium mb-2">
                  Phosphorus (P) Value
                </label>
                <div className="relative group">
                  <FontAwesomeIcon 
                    icon={faFlask} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38] transition-all duration-300 group-hover:text-[#283618]" 
                  />
                  <motion.input
                    type="number"
                    name="p_value"
                    value={form.p_value}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-xl border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all"
                    placeholder="Enter P value"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="block text-[#283618] font-medium mb-2">
                  Potassium (K) Value
                </label>
                <div className="relative group">
                  <FontAwesomeIcon 
                    icon={faFlask} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38] transition-all duration-300 group-hover:text-[#283618]" 
                  />
                  <motion.input
                    type="number"
                    name="k_value"
                    value={form.k_value}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-xl border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all"
                    placeholder="Enter K value"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column - Region, Area, Season */}
            <div className="space-y-6">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-[#283618] font-medium mb-2">
                  Region
                </label>
                <div className="relative group">
                  <FontAwesomeIcon 
                    icon={faLeaf} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38] transition-all duration-300 group-hover:text-[#283618]" 
                  />
                  <motion.select
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-xl border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all appearance-none cursor-pointer"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="">Select Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </motion.select>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#606C38] transition-all duration-300 group-hover:text-[#283618]" 
                  />
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="block text-[#283618] font-medium mb-2">
                  Area (hectares)
                </label>
                <div className="relative group">
                  <FontAwesomeIcon 
                    icon={faWater} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38] transition-all duration-300 group-hover:text-[#283618]" 
                  />
                  <motion.input
                    type="number"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-xl border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all"
                    placeholder="Enter area in hectares"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label className="block text-[#283618] font-medium mb-2">
                  Season
                </label>
                <div className="relative group">
                  <FontAwesomeIcon 
                    icon={faSeedling} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#606C38] transition-all duration-300 group-hover:text-[#283618]" 
                  />
                  <motion.select
                    name="season"
                    value={form.season}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white/50 rounded-xl border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38] transition-all appearance-none cursor-pointer"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option value="Kharif">Kharif</option>
                    <option value="Rabi">Rabi</option>
                  </motion.select>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#606C38] transition-all duration-300 group-hover:text-[#283618]" 
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full mt-8 py-4 bg-gradient-to-r from-[#606C38] to-[#283618] text-white rounded-xl font-semibold relative overflow-hidden group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#DDA15E] to-[#BC6C25] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <span className="relative">
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Analyzing Data...
                </>
              ) : (
                'Generate Smart Recommendations'
              )}
            </span>
          </motion.button>
        </motion.form>

        {/* Error Message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl mb-8"
            >
              <div className="flex items-center text-red-700">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                {error}
              </div>
            </motion.div>
          )}

          {/* Results Section */}
          {plans && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Plan Navigation */}
              <div className="flex justify-center gap-4 flex-wrap">
                {plans.map((plan, index) => (
                  <motion.button
                    key={plan.header}
                    onClick={() => setActiveTab(index)}
                    className={`px-6 py-3 rounded-xl font-medium relative overflow-hidden group ${
                      activeTab === index
                        ? 'text-white'
                        : 'text-[#283618] hover:text-[#606C38]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`absolute inset-0 rounded-xl ${
                        activeTab === index
                          ? 'bg-gradient-to-r from-[#606C38] to-[#283618]'
                          : 'bg-white/80'
                      }`}
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <span className="relative">
                      {plan.header.split('(')[0].trim()}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Active Plan Details */}
              <AnimatePresence mode="wait">
                {plans[activeTab] && (
                  <motion.div
                    key={plans[activeTab].header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                  >
                    {/* Summary Card */}
                    <motion.div
                      className="lg:col-span-3 backdrop-blur-lg bg-white/80 rounded-2xl p-8 shadow-xl border border-white/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-2xl font-bold text-[#283618] mb-6">Summary Analytics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                          className="bg-gradient-to-br from-[#606C38]/10 to-[#283618]/10 backdrop-blur-md rounded-xl p-6"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="w-12 h-12 rounded-lg bg-[#606C38] flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-[#283618] mb-2">Projected Revenue</h4>
                          <p className="text-2xl font-bold text-[#DDA15E]">
                            ₹{calculateTotalRevenue(plans[activeTab].entries).toLocaleString()}
                          </p>
                        </motion.div>                        <motion.div
                          className="bg-gradient-to-br from-[#DDA15E]/10 to-[#BC6C25]/10 backdrop-blur-md rounded-xl p-6"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="w-12 h-12 rounded-lg bg-[#DDA15E] flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faChartLine} className="text-xl text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-[#283618] mb-2">Average Yield</h4>
                          <p className="text-2xl font-bold text-[#606C38]">
                            {calculateAverageYield(plans[activeTab].entries).toFixed(2)} q/ha
                          </p>
                        </motion.div>

                        <motion.div
                          className="bg-gradient-to-br from-[#283618]/10 to-[#606C38]/10 backdrop-blur-md rounded-xl p-6"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <div className="w-12 h-12 rounded-lg bg-[#283618] flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faSeedling} className="text-xl text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-[#283618] mb-2">Plan Duration</h4>
                          <p className="text-2xl font-bold text-[#BC6C25]">
                            {plans[activeTab].entries.length} Years
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>                    {/* Year Cards */}
                    {plans[activeTab].entries.map((entry, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="backdrop-blur-lg bg-white/80 rounded-2xl p-6 border border-white/20 group hover:bg-white/90 transition-colors duration-300"
                      >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-[#283618]">Year {entry.Year}</h3>
                          <motion.div
                            className="px-4 py-1.5 bg-[#606C38]/10 rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="font-medium bg-gradient-to-r from-[#606C38] to-[#283618] bg-clip-text text-transparent">
                              {entry.Crop}
                            </span>
                          </motion.div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center group">
                            <span className="text-[#606C38]">Yield Forecast</span>
                            <motion.span 
                              className="font-semibold text-[#283618]"
                              whileHover={{ scale: 1.05 }}
                            >
                              {entry['Predicted Yield (q/ha)']} q/ha
                            </motion.span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#606C38]">Expected Revenue</span>
                            <motion.span 
                              className="font-semibold text-[#283618]"
                              whileHover={{ scale: 1.05 }}
                            >
                              ₹{entry['Revenue (INR)'].toLocaleString()}
                            </motion.span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#606C38]">Cultivation Area</span>
                            <motion.span 
                              className="font-semibold text-[#283618]"
                              whileHover={{ scale: 1.05 }}
                            >
                              {entry['Area (ha)']} ha
                            </motion.span>
                          </div>
                        </div>

                        {/* Soil Analysis */}
                        <div className="pt-4 border-t border-[#606C38]/20">
                          <h4 className="font-medium text-[#283618] mb-4">Soil Nutrient Analysis</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div 
                              className="bg-[#606C38]/5 rounded-lg p-3"
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="text-sm text-[#606C38] mb-1">Initial NPK Levels</p>
                              <p className="font-medium text-[#283618]">
                                {formatFertilizer(entry['NPK Before'])}
                              </p>
                            </motion.div>
                            <motion.div 
                              className="bg-[#DDA15E]/5 rounded-lg p-3"
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="text-sm text-[#606C38] mb-1">Required Fertilizer</p>
                              <p className="font-medium text-[#283618]">
                                {formatFertilizer(entry['Fertilizer Added'])}
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CropPredictor;