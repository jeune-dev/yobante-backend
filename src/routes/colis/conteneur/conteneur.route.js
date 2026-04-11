const express = require('express');
const router = express.Router();

const ConteneurController = require('../../../controllers/colis/conteneur/conteneurs.controller');
const authMiddleware = require('../../../middlewares/auth.middleware');

// 📦 Créer conteneur
router.post('/', authMiddleware, ConteneurController.creerConteneur);

// 📋 Liste conteneurs
router.get('/', authMiddleware, ConteneurController.listeConteneurs);

module.exports = router;