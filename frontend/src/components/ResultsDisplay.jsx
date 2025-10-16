import React from 'react';

const ResultsDisplay = ({ patientData, analysis }) => {
  const getLikelihoodClass = (likelihood) => {
    switch (likelihood.toLowerCase()) {
      case 'high':
        return 'likelihood-high';
      case 'medium':
        return 'likelihood-medium';
      case 'low':
        return 'likelihood-low';
      default:
        return 'likelihood-unknown';
    }
  };

  return (
    <div className="results-display">
      <div className="patient-summary-card">
        <h3>Patient Information</h3>
        <div className="patient-details">
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{patientData.name || 'Anonymous'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Age:</span>
            <span className="detail-value">{patientData.age} years</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Gender:</span>
            <span className="detail-value">{patientData.gender}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Symptoms:</span>
            <span className="detail-value">{patientData.symptoms}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{patientData.duration}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Severity:</span>
            <span className={`detail-value severity-${patientData.severity}`}>
              {patientData.severity}
            </span>
          </div>
          {patientData.medicalHistory && patientData.medicalHistory.length > 0 && (
            <div className="detail-item">
              <span className="detail-label">Medical History:</span>
              <span className="detail-value">
                {patientData.medicalHistory.join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="analysis-section">
        <h2>Analysis Results</h2>

        <div className="probable-conditions">
          <h3>Probable Conditions</h3>
          {analysis.probableConditions && analysis.probableConditions.length > 0 ? (
            <div className="conditions-list">
              {analysis.probableConditions.map((condition, index) => (
                <div key={index} className="condition-card">
                  <div className="condition-header">
                    <h4>{condition.name}</h4>
                    <span className={`likelihood-badge ${getLikelihoodClass(condition.likelihood)}`}>
                      {condition.likelihood} Likelihood
                    </span>
                  </div>
                  <p className="condition-description">{condition.description}</p>
                  <div className="condition-reasoning">
                    <strong>Why this might be:</strong>
                    <p>{condition.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No conditions identified</p>
          )}
        </div>

        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div className="recommendations-section">
            <h3>Recommendations</h3>
            <ul className="recommendations-list">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.warningSymptoms && analysis.warningSymptoms.length > 0 && (
          <div className="warning-symptoms-section">
            <h3>⚠️ Warning Signs - Seek Immediate Medical Attention If:</h3>
            <ul className="warning-list">
              {analysis.warningSymptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.nextSteps && analysis.nextSteps.length > 0 && (
          <div className="next-steps-section">
            <h3>Next Steps</h3>
            <ol className="next-steps-list">
              {analysis.nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        <div className="disclaimer-section">
          <div className="disclaimer-card">
            <h4>⚕️ Important Medical Disclaimer</h4>
            <p>{analysis.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
