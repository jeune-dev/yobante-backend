const express = require('express');
const router = express.Router();
const adminController = require('../../../controllers/boutique/admin/admin.controller');
const isAdmin = require('../../../middlewares/isAdmin.middleware'); 
const auth = require('../../../middlewares/auth.middleware');
const checkActiveUser = require('../../../middlewares/checkActiveUser.middleware');

// Protection des routes
router.use(auth);
router.use(checkActiveUser);
router.use(isAdmin);

// -------------------- NOMBRE TOTAL DE COMMANDES --------------------
router.get('/nombre-commandes', adminController.nombreCommandes);

// -------------------- CHIFFRE D’AFFAIRES --------------------
router.get('/chiffre-affaire', adminController.chiffreAffaire);

// -------------------- NOMBRE DE PRODUITS ACTIFS --------------------
router.get('/total-produits', adminController.totalProduits);

// -------------------- NOMBRE DE CLIENTS ACTIFS --------------------
router.get('/total-clients', adminController.totalClients);


module.exports = router;