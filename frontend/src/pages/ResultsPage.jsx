import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSymptom } from '../context/SymptomContext';
import ResultsDisplay from '../components/ResultsDisplay';
import HistoryList from '../components/HistoryList';
import { saveToHistory } from '../utils/localStorage';

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientData, analysisResult, resetState } = useSymptom();
  const [showHistory, setShowHistory] = useState(false);
  const historySaved = useRef(false);

  useEffect(() => {
    if (!patientData || !analysisResult) {
      if (location.state?.fromHistory && location.state?.historyData) {
        return;
      }
      navigate('/', { replace: true });
      return;
    }

    // Save to history only once
    if (!historySaved.current && !location.state?.fromHistory) {
      saveToHistory({
        patientData,
        analysis: analysisResult.analysis,
        timestamp: analysisResult.timestamp
      });
      historySaved.current = true;
    }

    const handlePopState = () => {
      navigate('/', { replace: true });
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [patientData, analysisResult, navigate, location.state]);

  const handleNewCheck = () => {
    resetState();
    navigate('/', { replace: true });
  };

  const handleHistorySelect = (historyItem) => {
    setShowHistory(false);
    window.scrollTo(0, 0);
  };

  const displayData = location.state?.fromHistory && location.state?.historyData
    ? {
        patientData: location.state.historyData.patientData,
        analysis: location.state.historyData.analysis
      }
    : {
        patientData,
        analysis: analysisResult?.analysis
      };

  if (!displayData.patientData || !displayData.analysis) {
    return null;
  }

  return (
    <div className="results-page">
      <div className="results-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Analysis Results</h1>
            <p className="header-subtitle">Review your symptom analysis below</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn-secondary"
              onClick={() => setShowHistory(true)}
            >
              <span className="btn-icon">📋</span>
              View History
            </button>
            <button 
              className="btn-primary"
              onClick={handleNewCheck}
            >
              <span className="btn-icon">🏠</span>
              New Check
            </button>
          </div>
        </div>
      </div>

      <div className="results-content">
        <div className="container">
          <ResultsDisplay 
            patientData={displayData.patientData}
            analysis={displayData.analysis}
          />

          <div className="results-actions">
            <button 
              className="btn-action btn-new-check"
              onClick={handleNewCheck}
            >
              Start New Symptom Check
            </button>
          </div>

          <div className="emergency-banner">
            <div className="emergency-icon">🚨</div>
            <div className="emergency-content">
              <h3>In Case of Emergency</h3>
              <p>If you're experiencing a medical emergency, call your local emergency services immediately. This tool is for educational purposes only.</p>
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
    </div>
  );
};

export default ResultsPage;
