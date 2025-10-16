const express = require('express');
const router = express.Router();
const { analyzeSymptoms, healthCheck } = require('../controllers/symptomController');

router.post('/analyze-symptoms', analyzeSymptoms);

router.get('/health', healthCheck);

module.exports = router;
