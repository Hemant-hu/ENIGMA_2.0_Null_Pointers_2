
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: "3rem", marginBottom: "10px" }}
      >
        🚀 Welcome to Lunar Hack
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ fontSize: "1.2rem", marginBottom: "30px" }}
      >
        AI-powered Smart Analysis System
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/upload")}
        style={{
          padding: "12px 30px",
          borderRadius: "30px",
          border: "none",
          background: "linear-gradient(45deg, #38bdf8, #6366f1)",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(56,189,248,0.5)",
        }}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}

export default Home;
