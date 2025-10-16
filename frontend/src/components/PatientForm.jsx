import React, { useState } from 'react';

const PatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    duration: '',
    severity: '',
    medicalHistory: []
  });

  const [errors, setErrors] = useState({});

  const medicalConditions = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Heart Disease',
    'Allergies',
    'None'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!formData.symptoms.trim() || formData.symptoms.trim().length < 10) {
      newErrors.symptoms = 'Please describe your symptoms (at least 10 characters)';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Please specify symptom duration';
    }

    if (!formData.severity) {
      newErrors.severity = 'Please select severity level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (condition) => {
    setFormData(prev => {
      const medicalHistory = prev.medicalHistory.includes(condition)
        ? prev.medicalHistory.filter(item => item !== condition)
        : [...prev.medicalHistory, condition];
      
      return { ...prev, medicalHistory };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <div className="form-section">
        <h2>Patient Information</h2>
        
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              min="1"
              max="120"
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender *</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Symptom Details</h2>
        
        <div className="form-group">
          <label htmlFor="symptoms">Describe Your Symptoms *</label>
          <textarea
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Please describe your symptoms in detail (e.g., headache, fever, cough...)"
            rows="5"
            className={errors.symptoms ? 'error' : ''}
          />
          {errors.symptoms && <span className="error-message">{errors.symptoms}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration *</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2 days, 1 week"
              className={errors.duration ? 'error' : ''}
            />
            {errors.duration && <span className="error-message">{errors.duration}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="severity">Severity Level *</label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className={errors.severity ? 'error' : ''}
            >
              <option value="">Select severity</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
            {errors.severity && <span className="error-message">{errors.severity}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Medical History (Optional)</h2>
        <div className="checkbox-group">
          {medicalConditions.map((condition) => (
            <label key={condition} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.medicalHistory.includes(condition)}
                onChange={() => handleCheckboxChange(condition)}
              />
              <span>{condition}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-disclaimer">
        <p>⚠️ <strong>Disclaimer:</strong> This tool is for educational purposes only and does not provide medical advice. Always consult a healthcare professional for diagnosis and treatment.</p>
      </div>

      <button type="submit" className="btn-submit">
        Analyze Symptoms
      </button>
    </form>
  );
};

export default PatientForm;
