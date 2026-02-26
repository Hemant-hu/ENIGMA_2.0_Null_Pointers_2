// Upload.jsx
import React, { useState, useCallback } from 'react';
import './Upload.css';
import { Upload as UploadIcon, Image, X, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [error, setError] = useState(null);

  // Handle drag events
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  }, []);

  // Handle file input
  const handleFileInput = (e) => {
    setError(null);
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  // Validate and set file
  const validateAndSetFile = (file) => {
    if (!file) return;

    // Check if file is image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, JPEG, TIF)');
      return;
    }

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size should be less than 50MB');
      return;
    }

    setFile(file);
    setDetectionComplete(false);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove file
  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setDetectionComplete(false);
    setProgress(0);
    setError(null);
  };

  // Simulate YOLO detection
  const runDetection = () => {
    if (!file) return;

    setIsLoading(true);
    setProgress(0);
    setDetectionComplete(false);
    setError(null);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setDetectionComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1>Upload Moon Imagery</h1>
        <p className="subtitle">Upload Chandrayaan-1/2 images for boulder & landslide detection</p>
      </div>

      <div className="upload-content">
        {/* Drag & Drop Area */}
        <div
          className={`drop-area ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-input"
            className="file-input"
            accept="image/png, image/jpeg, image/jpg, image/tiff"
            onChange={handleFileInput}
          />

          {!file ? (
            <div className="drop-content">
              <UploadIcon size={48} className="upload-icon" />
              <h3>Drag & drop your Moon image here</h3>
              <p>Supports: PNG, JPG, JPEG, TIFF (Max 50MB)</p>
              <label htmlFor="file-input" className="browse-btn">
                Browse Files
              </label>
            </div>
          ) : (
            <div className="file-preview-container">
              <div className="file-info">
                <Image size={24} />
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <button className="remove-file" onClick={removeFile}>
                  <X size={20} />
                </button>
              </div>

              {/* Image Preview */}
              {preview && (
                <div className="preview-section">
                  <img src={preview} alt="Preview" className="image-preview" />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              {/* Detection Button */}
              <button
                className={`detect-btn ${isLoading ? 'loading' : ''} ${detectionComplete ? 'complete' : ''}`}
                onClick={runDetection}
                disabled={isLoading || !file}
              >
                {isLoading ? (
                  <>
                    <Loader className="spin" size={20} />
                    <span>Detecting... {progress}%</span>
                  </>
                ) : detectionComplete ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Detection Complete!</span>
                  </>
                ) : (
                  <>
                    <span>Run YOLO Detection</span>
                  </>
                )}
              </button>

              {/* Loading Bar */}
              {isLoading && (
                <div className="loading-bar-container">
                  <div className="loading-bar" style={{ width: `${progress}%` }}></div>
                </div>
              )}

              {/* Detection Results Placeholder */}
              {detectionComplete && (
                <div className="detection-results">
                  <h4>Detection Summary</h4>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <span className="stat-label">Boulders</span>
                      <span className="stat-value">24</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Landslides</span>
                      <span className="stat-value">3</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Recent Events</span>
                      <span className="stat-value">2</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Ancient</span>
                      <span className="stat-value">25</span>
                    </div>
                  </div>
                  <button className="view-results-btn">View Detailed Results →</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sample Images */}
        <div className="sample-section">
          <h4>Sample Images</h4>
          <div className="sample-grid">
            <div className="sample-card">
              <img src="https://via.placeholder.com/150/0a0a0f/ffffff?text=Crater" alt="Sample 1" />
              <span>Crater Region</span>
            </div>
            <div className="sample-card">
              <img src="https://via.placeholder.com/150/0a0a0f/ffffff?text=Mare" alt="Sample 2" />
              <span>Mare Area</span>
            </div>
            <div className="sample-card">
              <img src="https://via.placeholder.com/150/0a0a0f/ffffff?text=Highland" alt="Sample 3" />
              <span>Highland</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;