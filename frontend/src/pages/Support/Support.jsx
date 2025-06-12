import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faUsers,
  faSeedling,
  faBook,
  faLeaf,
  faHandHoldingHeart,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faTractor,
  faShieldHeart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const TeamMember = ({ member }) => (
  <motion.div 
    className="bg-white rounded-xl p-6 shadow-lg"
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative mb-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-[#606C38] flex items-center justify-center text-[#FEFAE0]">
        <FontAwesomeIcon icon={member.icon} className="text-3xl" />
      </div>
      <motion.div 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-[#DDA15E] rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "30%" }}
        viewport={{ once: true }}
      />
    </div>
    <h3 className="text-xl font-bold text-center text-[#283618] mb-1">{member.name}</h3>
    <p className="text-[#606C38] text-center">{member.role}</p>
  </motion.div>
);

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("We have received your message and will get back to you soon!");
    setFormData({ name: "", email: "", message: "" });
  };

  const teamMembers = [
    {
      name: "Tharunkrishna M",
      role: "Innovation Lead",
      icon: faTractor,
    },
    {
      name: "V S Sreenivaas",
      role: "Tech Architect",
      icon: faSeedling,
    },
    {
      name: "Tallam Sri Sai Subramanyam",
      role: "Experience Designer",
      icon: faHeart,
    },
  ];

  const features = [
    {
      title: "Our Vision",
      description:
        "To revolutionize agriculture through innovation and community support, creating a sustainable ecosystem where farmers thrive.",
      icon: faGlobe,
    },
    {
      title: "Community First",
      description:
        "Building a strong network of farmers, buyers, and agricultural experts to share knowledge and grow together.",
      icon: faUsers,
    },
    {
      title: "Sustainable Growth",
      description:
        "Promoting eco-friendly farming practices while ensuring profitable outcomes for our farming community.",
      icon: faLeaf,
    },
    {
      title: "Expert Support",
      description:
        "Our dedicated team provides round-the-clock assistance for all your farming and technical needs.",
      icon: faShieldHeart,
    },
  ];

  return (
    <div className="min-h-screen pt-24 bg-[#FEFAE0]">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[#283618] mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            We're Here to <span className="text-[#606C38]">Support You</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-[#283618]/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your success in agriculture is our mission. Let us help you grow your farming business
            with our innovative solutions and dedicated support team.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-[#283618]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-[#FEFAE0]/10 backdrop-blur-sm rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(254, 250, 224, 0.15)"
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#DDA15E]/20 flex items-center justify-center text-[#DDA15E]">
                    <FontAwesomeIcon icon={feature.icon} className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#FEFAE0] mb-2">{feature.title}</h3>
                    <p className="text-[#FEFAE0]/80">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center text-[#283618] mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Meet Our Core Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TeamMember member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 bg-[#283618]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#FEFAE0]"
            >
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-[#FEFAE0]/80 mb-8">
                Have questions or need assistance? We're here to help. Reach out to us through any of
                these channels or fill out the form.
              </p>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#DDA15E]/20 flex items-center justify-center text-[#DDA15E]">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <p className="text-sm text-[#FEFAE0]/60">Email</p>
                    <p>support@bharathharvest.com</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#DDA15E]/20 flex items-center justify-center text-[#DDA15E]">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <p className="text-sm text-[#FEFAE0]/60">Phone</p>
                    <p>+91 7892781710</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#DDA15E]/20 flex items-center justify-center text-[#DDA15E]">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </div>
                  <div>
                    <p className="text-sm text-[#FEFAE0]/60">Location</p>
                    <p>Mysuru Road, RVCE, Bengaluru, 560059</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.form
                onSubmit={handleSubmit}
                className="bg-[#FEFAE0] rounded-xl p-6 shadow-lg"
              >
                <div className="space-y-6">
                  <motion.div whileHover={{ y: -2 }}>
                    <label className="block text-[#283618] font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                      placeholder="Enter your name"
                      required
                    />
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -2 }}>
                    <label className="block text-[#283618] font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                      placeholder="Enter your email"
                      required
                    />
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -2 }}>
                    <label className="block text-[#283618] font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-[#DDA15E]/30 focus:outline-none focus:ring-2 focus:ring-[#606C38]"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-4 bg-[#606C38] text-[#FEFAE0] rounded-lg font-medium shadow-md"
                    whileHover={{ scale: 1.02, backgroundColor: "#4d5a27" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>Send Message</span>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
