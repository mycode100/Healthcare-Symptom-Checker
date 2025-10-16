const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const analyzeSymptoms = async (patientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-symptoms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }
    
    throw new Error(error.message || 'An unexpected error occurred. Please try again later.');
  }
};

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health check error:', error);
    throw new Error('Unable to verify server status');
  }
};
