import React, { useState, useEffect } from 'react';

const LoadingOverlay = () => {
  const messages = [
    'Analyzing your symptoms...',
    'Consulting medical knowledge base...',
    'Processing patient information...',
    'Generating personalized recommendations...',
    'Evaluating possible conditions...',
    'Almost there, preparing your results...'
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [messages.length]);

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="pulse-ring"></div>
        </div>

        <div className="loading-messages">
          <h2 className="loading-title">Please Wait</h2>
          <p className="loading-message">{messages[currentMessageIndex]}</p>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>

        <div className="loading-tips">
          <p>💡 Tip: This analysis is for educational purposes only</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
