const { getGeminiModel } = require('../utils/geminiConfig');
const { jsonrepair } = require('jsonrepair'); // 🧩 new addition

const analyzeSymptoms = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      symptoms,
      duration,
      severity,
      medicalHistory = []
    } = req.body;

    // ==== Validation ====
    if (!symptoms || symptoms.trim().length === 0)
      return res.status(400).json({ success: false, message: 'Symptoms description is required' });

    if (!age || age < 1 || age > 120)
      return res.status(400).json({ success: false, message: 'Valid age is required (1-120)' });

    if (!gender || !['male', 'female', 'other'].includes(gender.toLowerCase()))
      return res.status(400).json({ success: false, message: 'Valid gender is required (male/female/other)' });

    if (!duration || duration.trim().length === 0)
      return res.status(400).json({ success: false, message: 'Symptom duration is required' });

    if (!severity || !['mild', 'moderate', 'severe'].includes(severity.toLowerCase()))
      return res.status(400).json({ success: false, message: 'Valid severity level is required (mild/moderate/severe)' });

    // ==== Initialize Gemini ====
    const model = getGeminiModel();

    const prompt = `
You are an AI medical assistant for educational purposes only.

PATIENT INFORMATION:
- Name: ${name || 'Not provided'}
- Age: ${age}
- Gender: ${gender}
- Symptoms: ${symptoms}
- Duration: ${duration}
- Severity: ${severity}
- Medical History: ${medicalHistory.length > 0 ? medicalHistory.join(', ') : 'None reported'}

TASK:
Provide an analysis strictly in this JSON format:
{
  "probableConditions": [
    { "name": "Condition Name", "likelihood": "High/Medium/Low", "description": "Brief explanation", "reasoning": "Why this fits" }
  ],
  "recommendations": ["Specific recommendation 1","Specific recommendation 2"],
  "warningSymptoms": ["Red flag 1","Red flag 2"],
  "nextSteps": ["Action 1","Action 2"],
  "disclaimer": "This analysis is for educational purposes only and not medical advice."
}

Rules:
- Give 3–5 probable conditions.
- Plain, non-technical wording.
- Always return valid JSON only.
`;

    // ==== Call Gemini ====
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let analysisText = response.text();

    // ==== Clean the AI response ====
    analysisText = analysisText.replace(/```json|```/g, '').trim();

    if (analysisText.includes('{') && analysisText.includes('}')) {
      const startIndex = analysisText.indexOf('{');
      const endIndex = analysisText.lastIndexOf('}');
      analysisText = analysisText.substring(startIndex, endIndex + 1);
    }

    // ==== Parse JSON safely ====
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (err) {
      console.warn('Initial JSON parse failed, attempting repair...');
      try {
        analysis = JSON.parse(jsonrepair(analysisText)); // 🛠 auto-fix broken JSON
      } catch (repairErr) {
        console.error('JSON repair failed:', repairErr);
        console.error('Raw response:', analysisText);

        // Fallback safe response
        analysis = {
          probableConditions: [
            {
              name: "Analysis Error",
              likelihood: "Unknown",
              description: "Unable to parse AI response",
              reasoning: "Response was not valid JSON"
            }
          ],
          recommendations: [
            "Retry with clearer symptom description",
            "Consult a healthcare professional"
          ],
          warningSymptoms: ["Severe pain", "Difficulty breathing", "Chest pain"],
          nextSteps: [
            "Seek immediate care if symptoms worsen",
            "Book an appointment with a doctor"
          ],
          disclaimer:
            "This analysis is for educational purposes only and not a substitute for professional medical advice."
        };
      }
    }

    // ==== Send final response ====
    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      patientData: {
        name: name || 'Anonymous',
        age,
        gender,
        symptoms,
        duration,
        severity,
        medicalHistory
      },
      analysis,
      message: 'Symptom analysis completed successfully'
    });
  } catch (error) {
    console.error('Error in analyzeSymptoms controller:', error);

    const message = error.message || 'Internal server error';
    if (message.includes('API key'))
      return res.status(500).json({ success: false, message: 'API key invalid or missing' });

    if (message.includes('quota'))
      return res.status(429).json({ success: false, message: 'Quota exceeded, try later' });

    res.status(500).json({
      success: false,
      message: 'An error occurred while analyzing symptoms',
      error: process.env.NODE_ENV === 'development' ? message : undefined
    });
  }
};

// ==== Health Check Endpoint ====
const healthCheck = async (req, res) => {
  try {
    const model = getGeminiModel();
    res.status(200).json({
      success: true,
      message: 'Healthcare Symptom Checker API running',
      timestamp: new Date().toISOString(),
      status: 'healthy',
      services: {
        api: 'operational',
        geminiAI: model ? 'connected' : 'disconnected'
      }
    });
  } catch {
    res.status(503).json({
      success: false,
      message: 'Service health check failed',
      timestamp: new Date().toISOString(),
      status: 'unhealthy'
    });
  }
};

module.exports = { analyzeSymptoms, healthCheck };
