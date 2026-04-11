const express = require('express');
const router = express.Router();

const DemandeController = require('../../../controllers/colis/demande/demandes.controller');
const authMiddleware = require('../../../middlewares/auth.middleware');

// 🔄 Simulation (sans compte)
router.post('/simulation', DemandeController.simulerEnvoi);

// 📩 Création demande
router.post('/', authMiddleware, DemandeController.creerDemande);

// 📋 Liste demandes (admin)
router.get('/', authMiddleware, DemandeController.listeDemandes);

module.exports = router;