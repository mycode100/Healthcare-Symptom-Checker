import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SymptomProvider } from './context/SymptomContext';
import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <SymptomProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </Router>
    </SymptomProvider>
  );
}

export default App;
