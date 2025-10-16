# 🏥 Healthcare Symptom Checker

An AI-powered healthcare symptom analysis application that provides educational insights about potential medical conditions based on user-reported symptoms. Built with React, Node.js, Express, and Google Gemini AI.

## 📹 Video Demonstrations

- **With Subtitles**: https://drive.google.com/file/d/1br-YQe2pPAR-1qFsDBeBNVAq7BsalTOQ/view?usp=sharing
- **Without Subtitles**: https://drive.google.com/file/d/1YwVKpBy4hqDeu98UZ-birZZi1BCR8ouo/view?usp=sharing

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Usage Guide](#-usage-guide)
- [Important Notes](#-important-notes)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#license)

## 🎯 Project Overview

Healthcare Symptom Checker is a full-stack web application designed for educational purposes only. It uses Google's Gemini 2.5 Flash AI model to analyze patient symptoms and provide:

- Probable medical conditions with likelihood ratings (High/Medium/Low)
- Personalized health recommendations and next steps
- Warning symptoms requiring immediate attention
- Symptom analysis history using localStorage

**Medical Disclaimer**: This application is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for proper medical care.

## ✨ Features

- Modern, responsive UI with healthcare-focused design
- Comprehensive patient form with validation
- Loading animations with progress tracking
- Detailed results with color-coded likelihood badges
- History management: view, access, and delete previous checks
- Robust backend with AI integration and JSON parsing
- Clean API surface and clear error handling

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM 6, Context API, CSS
- **Backend**: Node.js 16+, Express 4, dotenv
- **AI/ML**: Google Generative AI (Gemini 2.5 Flash)

## 📁 Project Structure

```
healthcare-symptom-checker/
│
├── backend/
│   ├── controllers/             # Analysis logic & JSON parsing
│   ├── routes/                  # API route definitions
│   ├── utils/                   # Gemini AI configuration
│   ├── .env                     # Environment variables (CREATE THIS)
│   └── server.js                # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/          # History, Loading, Form, Results components
│   │   ├── context/             # React Context for state
│   │   ├── pages/               # Home, Loading, Results pages
│   │   └── utils/               # API helpers and LocalStorage utilities
│   └── App.js                   # Main app with routing
│
└── README.md                    # This file
```

## 📦 Prerequisites

- **Node.js** (v16 or higher): https://nodejs.org/
- **npm** or **yarn**
- **Google Gemini API Key**: https://makersuite.google.com/app/apikey

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/mycode100/Healthcare-Symptom-Checker.git
cd Healthcare-Symptom-Checker
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## 🔐 Environment Variables

### Backend (REQUIRED)

Create `backend/.env` with:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

Get API key from Google AI Studio: https://makersuite.google.com/app/apikey

### Frontend (OPTIONAL)

Create `frontend/.env` (optional):

```
REACT_APP_API_URL=http://localhost:5000/api
```

## ▶️ Running the Application

### Run Both Servers Separately (Recommended)

**Terminal 1 - Backend:**

```bash
cd backend
node server.js
```

Expected: Server running on port 5000

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

Expected: http://localhost:3000

## 🌐 API Endpoints

**Base URL**: `http://localhost:5000/api`

### Health Check

```
GET /api/health
```

**Description**: Checks if the API server and Gemini AI connection are operational.

### Analyze Symptoms

```
POST /api/analyze-symptoms
```

**Description**: Submits patient data for AI analysis.

**Request Body Example:**

```json
{
  "name": "John Doe",
  "age": 25,
  "gender": "male",
  "symptoms": "fever, vomiting, body pains",
  "duration": "3 days",
  "severity": "moderate",
  "medicalHistory": ["None"]
}
```

## 📖 Usage Guide

1. **Access**: Navigate to http://localhost:3000
2. **Form**: Fill out required personal information and detailed symptom description
3. **Analyze**: Click "Analyze Symptoms"
4. **Wait**: Loading screen while AI processes the data (5–10 seconds)
5. **View Results**: Review the detailed analysis (probable conditions, recommendations, warning symptoms, next steps)
6. **History**: Use "View History" to access past analyses stored locally

## ⚠️ Important Notes

### Medical Disclaimer & Limitations

- Educational tool only; not a diagnostic system
- Not suitable for emergencies
- Always consult qualified healthcare professionals

### Data Privacy & Security

- History stored in browser localStorage only
- No personal data stored on backend servers
- Patient data is sent to Google Gemini AI for analysis per Google's terms

### Advanced JSON Parser

Backend extracts valid JSON from Gemini responses, safely handling markdown formatting and malformed text for reliability.

## 🔧 Troubleshooting

- **Server Not Starting**: Port 5000 in use → kill process or change PORT in `backend/.env`
- **API Key Missing**: Ensure `backend/.env` exists with `GEMINI_API_KEY` and restart backend
- **CORS Errors**: Verify `app.use(cors())` in `server.js`; ensure both servers running
- **Failed to Fetch**: Start backend first (`cd backend && node server.js`)

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/your-feature-name`
3. Commit: `git commit -m "Add: Your feature description"`
4. Push: `git push origin feature/your-feature-name`
5. Open Pull Request
