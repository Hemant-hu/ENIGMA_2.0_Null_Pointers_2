import React from "react";

function Results() {
  return (
    <div className="page-container">
      <h1>Analysis Results</h1>

      <div className="result-card">
        <h3>File Name:</h3>
        <p>example.pdf</p>

        <h3>Status:</h3>
        <p>Processed Successfully ✅</p>

        <h3>Confidence Score:</h3>
        <p>92%</p>
      </div>
    </div>
  );
}

export default Results;
