import React from 'react';

const HistoryList = ({ onSelectHistory, onClose }) => {
  const getHistoryFromStorage = () => {
    try {
      const history = localStorage.getItem('symptomHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error reading history:', error);
      return [];
    }
  };

  const history = getHistoryFromStorage();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('symptomHistory');
      window.location.reload();
    }
  };

  if (history.length === 0) {
    return (
      <div className="history-empty">
        <h3>No History Available</h3>
        <p>Your previous symptom checks will appear here.</p>
        <button onClick={onClose} className="btn-close">Close</button>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Previous Checks</h2>
        <button onClick={onClose} className="btn-close-icon">✕</button>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <div 
            key={item.id} 
            className="history-item"
            onClick={() => onSelectHistory(item)}
          >
            <div className="history-item-header">
              <span className="history-date">{formatDate(item.timestamp)}</span>
              <span className="history-severity">{item.patientData.severity}</span>
            </div>
            
            <div className="history-item-body">
              <p className="history-patient">
                <strong>{item.patientData.name || 'Anonymous'}</strong> - {item.patientData.age} yrs, {item.patientData.gender}
              </p>
              <p className="history-symptoms">{item.patientData.symptoms.substring(0, 100)}...</p>
            </div>

            <div className="history-item-footer">
              <span className="history-conditions">
                {item.analysis.probableConditions?.length || 0} conditions analyzed
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="history-actions">
        <button onClick={clearHistory} className="btn-clear-history">
          Clear All History
        </button>
      </div>
    </div>
  );
};

export default HistoryList;
