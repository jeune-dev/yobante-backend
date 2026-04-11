const express = require('express');
const router = express.Router();

const ClientController = require('../../../controllers/colis/client/client.controller');
const authMiddleware = require('../../../middlewares/auth.middleware');

// 📦 Envoyer colis
router.post('/colis', authMiddleware, ClientController.envoyerColis);

// 📤 Colis envoyés
router.get('/colis-envoyes', authMiddleware, ClientController.listeColisEnvoyes);

// 📥 Colis reçus
router.get('/colis-recus', authMiddleware, ClientController.listeColisRecus);

// 🔍 Suivi (sans auth possible)
router.get('/suivi/:numero_suivi', ClientController.suivreColis);

module.exports = router;