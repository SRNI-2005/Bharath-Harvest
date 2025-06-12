import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faLightbulb,
  faLeaf,
  faArrowRight,
  faTractor,
  faChartLine,
  faRobot,
  faMagnifyingGlassChart,
  faShield,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import cropsImage from "../../assets/crops_soil.png";
import "./Home.css";

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 shadow-lg hover:bg-white/80 hover:shadow-2xl hover:scale-105 hover:border-white/60 transition-all duration-300 group"
  >
    <motion.div
      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#606C38] to-[#283618] flex items-center justify-center mb-4"
      whileHover={{ scale: 1.05, rotate: 5 }}
    >
      <FontAwesomeIcon icon={icon} className="text-[#FEFAE0] text-xl" />
    </motion.div>
    <h3 className="text-xl font-semibold text-[#283618] mb-2">{title}</h3>
    <p className="text-[#606C38]/80">{description}</p>
    <motion.div
      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#606C38]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={false}
    />
  </motion.div>
);

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FEFAE0]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-[#606C38] rounded-full mix-blend-multiply filter blur-2xl opacity-15"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        /> */}
        {/* <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#DDA15E] rounded-full mix-blend-multiply filter blur-2xl opacity-15"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        /> */}
        
        {/* Decorative floating elements */}
        {/* <motion.div
          className="absolute top-40 right-40 w-24 h-24"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        > */}
          {/* <div className="w-full h-full bg-gradient-to-br from-[#DDA15E]/40 to-[#BC6C25]/40 backdrop-blur-sm rounded-lg border border-white/40 transform rotate-45" />
        </motion.div> */}
        
        <motion.div
          className="absolute bottom-60 left-40 w-16 h-16"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-[#606C38]/40 to-[#283618]/40 backdrop-blur-sm rounded-full border border-white/40" />
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-[250px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center backdrop-blur-3xl bg-[#]/70 rounded-3xl p-8 shadow-2xl border border-white/40"
        >
          {/* Hero Content */}
          <div className="space-y-6 ">
            <motion.div className="space-y-3">
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-[#283618] leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Future of
                <motion.span
                  className="block text-[#606C38] mt-2 relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Agriculture
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#DDA15E] to-[#BC6C25] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-[#606C38]/80 leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Revolutionizing farming with AI-powered insights, smart market
                connections, and sustainable agricultural practices.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-[#606C38] to-[#283618] text-[#FEFAE0] rounded-xl font-medium relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#DDA15E] to-[#BC6C25] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <span className="relative flex items-center gap-2">
                  Get Started
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                  </motion.div>
                </span>
              </motion.button>

              <motion.button
                className="px-8 py-4 border-2 border-[#606C38] text-[#606C38] rounded-xl font-medium relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(96, 108, 56, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#606C38]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <span className="relative">Learn More</span>
              </motion.button>
            </motion.div>
            
            <motion.div
              className="mt-12 flex gap-6 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#606C38] to-[#283618] border-2 border-white flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FontAwesomeIcon icon={faUserGroup} className="text-[#FEFAE0] text-sm" />
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-[#283618] font-semibold">Join 10,000+ farmers</p>
                <p className="text-[#606C38]/70 text-sm">Growing together sustainably</p>
              </div>
            </motion.div>
          </div>

          {/* Image and Feature Grid Container */}
          <div className="relative">
            {/* Background Image */}
            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: faRobot, title: "AI Insights", description: "Smart crop recommendations" },
                { icon: faMagnifyingGlassChart, title: "Market Analysis", description: "Real-time price tracking" },
                { icon: faShield, title: "Crop Protection", description: "Disease prevention tips" },
                { icon: faLightbulb, title: "Smart Planning", description: "Optimal farming schedules" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/95 transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#606C38]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#606C38] to-[#283618] flex items-center justify-center mb-3">
                      <FontAwesomeIcon icon={feature.icon} className="text-[#FEFAE0] text-lg" />
                    </div>
                    <h3 className="font-medium text-[#283618] mb-1">{feature.title}</h3>
                    <p className="text-sm text-[#606C38]/70">{feature.description}</p>
                  </div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tr from-[#606C38]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"
                    initial={false}
                  />
                </motion.div>
              ))}
            </div>
            
          </div>
        </motion.div>
        {/* Full screen background image */}
        <motion.div
          className="fixed inset-0 -z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* <img
            src={cropsImage}
            alt="Agricultural crops"
            className="w-full h-screen object-cover mix-blend-multiply opacity-30"
          /> */}
        </motion.div>
      </div>
    </section>
  );
};


const Stats = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="pt-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FEFAE0]/30 to-white">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full bg-[#606C38]/10 backdrop-blur-lg rounded-l-full"
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Farmers Empowered", value: "10,000+" },
            { label: "Crop Varieties", value: "200+" },
            { label: "Success Rate", value: "95%" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              className="text-center backdrop-blur-sm bg-white/70 p-8 rounded-2xl border border-white/40 shadow-lg hover:bg-white/80 hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                className="text-5xl font-bold text-[#283618] mb-2 relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#606C38]/20 to-[#DDA15E]/20 blur-lg" />
                <span className="relative">{stat.value}</span>
              </motion.div>
              <p className="text-[#606C38]/80 text-lg relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-4 relative overflow-hidden">
      {/* Decorative elements */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
        <motion.div
          className="absolute top-20 left-[20%] w-64 h-64 bg-[#606C38] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[20%] w-72 h-72 bg-[#DDA15E] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div> */}

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 backdrop-blur-sm bg-white/70 p-6 rounded-2xl border border-white/40 shadow-lg"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#606C38]/20 to-[#DDA15E]/20 blur-lg rounded-lg" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#283618] mb-6 relative">
              Transforming Agriculture with Technology
            </h2>
          </motion.div>
          <p className="text-xl text-[#606C38]/80">
            Discover how our intelligent platform helps farmers make data-driven decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: faLeaf,
              title: "Smart Crop Planning",
              description: "AI-powered recommendations for optimal crop selection and rotation strategies",
              delay: 0.2
            },
            {
              icon: faChartLine,
              title: "Market Intelligence",
              description: "Real-time market insights and price predictions for better selling decisions",
              delay: 0.3
            },
            {
              icon: faUserGroup,
              title: "Expert Network",
              description: "Connect with agricultural experts and successful farmers in your region",
              delay: 0.4
            },
            {
              icon: faTractor,
              title: "Resource Optimization",
              description: "Optimize resource usage with smart scheduling and monitoring tools",
              delay: 0.5
            },
            {
              icon: faSeedling,
              title: "Yield Enhancement",
              description: "Proven techniques and tips to maximize your crop yield sustainably",
              delay: 0.6
            },
            {
              icon: faLightbulb,
              title: "Innovation Hub",
              description: "Stay updated with the latest agricultural technologies and practices",
              delay: 0.7
            }
          ].map(feature => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>

      {/* Decorative background pattern */}
      <div className="-z-10 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M0 16 L16 0 L32 16 L16 32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="py-8 relative overflow-hidden bg-[#FEFAE0]">
    <div className="absolute inset-0 bg-[#FEFAE0]">
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#606C38] via-[#DDA15E] to-[#283618] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>

    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-[#283618] mb-6"
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready to Transform Your Farming?
      </motion.h2>
      
      <motion.p
        className="text-xl text-[#606C38]/80 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Join thousands of farmers who are already using our platform to improve their yields and profits
      </motion.p>

      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-[#606C38] to-[#283618] text-[#FEFAE0] rounded-xl font-medium relative overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#DDA15E] to-[#BC6C25] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        <span className="relative">Start Your Journey</span>
      </motion.button>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="bg-[#FEFAE0] space-y-4">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </div>
  );
};

export default Home;