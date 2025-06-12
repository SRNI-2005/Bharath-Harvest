import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faGlobe,
  faEnvelope,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import logo from "/new_logo2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faEnvelope, url: "#", label: "Email" },
    { icon: faGlobe, url: "#", label: "Website" },
    { icon: faLink, url: "#", label: "Connect" },
  ];

  const footerLinks = [
    { label: "Shop", path: "/marketplace" },
    { label: "Learn", path: "/learn" },
    { label: "Support", path: "/support" },
    { label: "Schemes", path: "/schemes" },
    { label: "Predictor", path: "/predictor" },
  ];

  return (
    <footer className="bg-[#283618] text-[#FEFAE0] z-20">
      <div className="max-w-5xl mx-auto px-6 py-12 bg-[#283618]">
        <div className="flex flex-col items-center text-center">
          {/* Logo Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Bharath Harvest" className="h-8 w-auto" />
              <div className="text-xl font-bold">
                <span className="text-[#BC6C25]">Bharath</span>
                <span className="text-[#DDA15E]">Harvest</span>
              </div>
            </div>
            <p className="text-sm text-[#FEFAE0] max-w-md">
              Empowering farmers with innovative solutions for a sustainable
              future
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-sm hover:text-[#DDA15E] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FEFAE0]/60 hover:text-[#DDA15E] transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <FontAwesomeIcon icon={social.icon} className="text-xl" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-sm text-[#FEFAE0]/40 flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span>© {currentYear} BharathHarvest  </span>
            {/* <motion.span
              animate={{
                scale: [1, 1.2, 1],
                color: ["#FEFAE0", "#DDA15E", "#FEFAE0"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <FontAwesomeIcon icon={faHeart} className="text-xs" />
            </motion.span> */}
            <span></span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;