import React, { createContext, useContext, useState } from 'react';

const SymptomContext = createContext();

export const useSymptom = () => {
  const context = useContext(SymptomContext);
  if (!context) {
    throw new Error('useSymptom must be used within a SymptomProvider');
  }
  return context;
};

export const SymptomProvider = ({ children }) => {
  const [patientData, setPatientData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitSymptoms = (data) => {
    setPatientData(data);
    setError(null);
  };

  const setAnalysis = (analysis) => {
    setAnalysisResult(analysis);
  };

  const setLoadingState = (loading) => {
    setIsLoading(loading);
  };

  const setErrorState = (errorMessage) => {
    setError(errorMessage);
  };

  const resetState = () => {
    setPatientData(null);
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
  };

  const value = {
    patientData,
    analysisResult,
    isLoading,
    error,
    submitSymptoms,
    setAnalysis,
    setLoadingState,
    setErrorState,
    resetState
  };

  return (
    <SymptomContext.Provider value={value}>
      {children}
    </SymptomContext.Provider>
  );
};
