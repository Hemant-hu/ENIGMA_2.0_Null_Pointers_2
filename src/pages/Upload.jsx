import React, { useState } from "react";
import { motion } from "framer-motion";

function Upload() {
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);

      // Fake progress animation
      let value = 0;
      const interval = setInterval(() => {
        value += 10;
        setProgress(value);
        if (value >= 100) clearInterval(interval);
      }, 200);
    }
  };

  return (
    <motion.div
      className="upload-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="ai-orb"></div>

      <div className="upload-box">
        <h1>🚀 AI Upload Station</h1>
        <p>Drop your file into the system</p>

        <label className="drop-zone">
          <input type="file" onChange={handleFile} />
          {fileName ? `📂 ${fileName}` : "Drag & Drop or Click to Upload"}
        </label>

        {progress > 0 && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="analyze-btn"
        >
          Analyze
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Upload;
