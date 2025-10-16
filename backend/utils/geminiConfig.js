const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiModel = () => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048
      }
    });
    return model;
  } catch (error) {
    console.error('Error initializing Gemini model:', error);
    throw new Error('Failed to initialize Gemini AI model');
  }
};

module.exports = { getGeminiModel };
