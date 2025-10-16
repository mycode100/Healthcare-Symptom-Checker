import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSymptom } from '../context/SymptomContext';
import PatientForm from '../components/PatientForm';
import HistoryList from '../components/HistoryList';

const HomePage = () => {
  const navigate = useNavigate();
  const { submitSymptoms } = useSymptom();
  const [showHistory, setShowHistory] = useState(false);

  const handleFormSubmit = (formData) => {
    submitSymptoms(formData);
    navigate('/loading');
  };

  const handleHistorySelect = (historyItem) => {
    submitSymptoms(historyItem.patientData);
    navigate('/results', { state: { fromHistory: true, historyData: historyItem } });
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🏥</span>
            <span>AI-Powered Healthcare Assistant</span>
          </div>
          <h1 className="hero-title">
            Healthcare Symptom Checker
          </h1>
          <p className="hero-subtitle">
            Get instant AI-powered insights about your symptoms. Our advanced system analyzes your health information to provide educational guidance.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Instant Analysis</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <span>AI-Powered</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Private & Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="container">
          <div className="content-header">
            <div className="section-title-wrapper">
              <h2 className="section-title">Enter Your Information</h2>
              <p className="section-description">
                Fill out the form below with accurate information for better analysis results
              </p>
            </div>
            <button 
              className="btn-history"
              onClick={() => setShowHistory(!showHistory)}
            >
              <span className="history-icon">📋</span>
              View History
            </button>
          </div>

          <div className="form-container">
            <PatientForm onSubmit={handleFormSubmit} />
          </div>

          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">💡</div>
              <h3>Educational Purpose</h3>
              <p>This tool provides educational information only and is not a substitute for professional medical advice.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">⚕️</div>
              <h3>Professional Care</h3>
              <p>Always consult with qualified healthcare professionals for accurate diagnosis and treatment.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🚨</div>
              <h3>Emergency Services</h3>
              <p>For medical emergencies, call your local emergency services immediately.</p>
            </div>
          </div>

          <div className="trust-section">
            <div className="trust-content">
              <h3>Powered by Advanced AI Technology</h3>
              <p>Our system uses Google Gemini AI to analyze symptoms and provide comprehensive health insights based on medical knowledge.</p>
              <div className="trust-badges">
                <div className="trust-badge">
                  <span className="badge-check">✓</span>
                  <span>Educational Tool</span>
                </div>
                <div className="trust-badge">
                  <span className="badge-check">✓</span>
                  <span>Privacy Focused</span>
                </div>
                <div className="trust-badge">
                  <span className="badge-check">✓</span>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showHistory && (
        <div className="modal-overlay" onClick={() => setShowHistory(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <HistoryList 
              onSelectHistory={handleHistorySelect}
              onClose={() => setShowHistory(false)}
            />
          </div>
        </div>
      )}

      <footer className="home-footer">
        <div className="footer-content">
          <p>© 2025 Healthcare Symptom Checker. All rights reserved.</p>
          <p className="footer-disclaimer">
            This application is for educational purposes only. Not intended for medical diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
