import React from 'react';
import './Home.css';
import { Upload, LayoutDashboard, ArrowRight, ThermometerSun } from 'lucide-react';

const Home = () => {
    return (
        <div className="home-container">
            {/* Left Side - Content with dark background */}
            <div className="left-side">
                <div className="content-wrapper">
                    <h1 className="main-title">
                        LunarSlide<span className="accent">AI</span>
                    </h1>
                    <h2 className="sub-title">Lunar Geomorphology Analysis Platform</h2>
                    <p className="description">
                        Automated detection of boulders and landslides using Chandrayaan-1/2 imagery
                    </p>

                    <div className="stats-container">
                        <div className="stat-item">
                            <span className="stat-value">0.3m</span>
                            <span className="stat-label">Resolution</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">24/7</span>
                            <span className="stat-label">Processing</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-value">99%</span>
                            <span className="stat-label">Accuracy</span>
                        </div>
                    </div>

                    <div className="buttons-container">
                        <a href="#upload" className="action-btn primary-btn">
                            <Upload size={20} />
                            <span>Upload Image →</span>
                            <ArrowRight size={16} className="btn-arrow" />
                        </a>
                        <a href="#dashboard" className="action-btn secondary-btn">
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </a>
                    </div>

                    <div className="footer-info">
                        <div className="info-item">
                            <span className="dot ch2"></span>
                            <span>Chandrayaan-2 OHRC</span>
                        </div>
                        <div className="info-item">
                            <span>Schrödinger Basin</span>
                        </div>
                        <div className="info-item">
                            <span>0.3m resolution</span>
                        </div>
                        <div className="info-item weather">
                            <ThermometerSun size={16} />
                            <span>32°C Mostly sunny</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Pure moon image without overlay */}
            <div className="right-side">
                {/* No overlay - just empty for moon to show through */}
            </div>
        </div>
    );
};

export default Home;