import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSymptom } from '../context/SymptomContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { analyzeSymptoms } from '../utils/api';

const LoadingPage = () => {
  const navigate = useNavigate();
  const { patientData, setAnalysis, setLoadingState, setErrorState } = useSymptom();

  useEffect(() => {
    if (!patientData) {
      navigate('/');
      return;
    }

    const fetchAnalysis = async () => {
      setLoadingState(true);
      
      try {
        const response = await analyzeSymptoms(patientData);
        
        if (response.success) {
          setAnalysis(response);
          setLoadingState(false);
          navigate('/results', { replace: true });
        } else {
          setErrorState(response.message || 'Analysis failed');
          setLoadingState(false);
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error analyzing symptoms:', error);
        setErrorState('Failed to analyze symptoms. Please try again.');
        setLoadingState(false);
        navigate('/', { replace: true });
      }
    };

    fetchAnalysis();
  }, [patientData, navigate, setAnalysis, setLoadingState, setErrorState]);

  return (
    <div className="loading-page">
      <LoadingOverlay />
    </div>
  );
};

export default LoadingPage;
