const express = require('express');
const router = express.Router();

const TarifsController = require('../../../controllers/colis/tarif/tarifs.controller');

// 📊 Tous les tarifs
router.get('/', TarifsController.getTarifs);

// 🧮 Simulation tarif
router.get('/simulation', TarifsController.getTarifSimulation);

module.exports = router;